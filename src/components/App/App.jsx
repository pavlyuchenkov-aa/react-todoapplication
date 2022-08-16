import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TodoSearch from '../TodoSearch/TodoSearch';
import TodoForm from '../TodoForm';
import Split from 'react-split'
import TodoItem from '../TodoItem';
import './App.css';

//класс приложения
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            searchText: ''
        }

        //добавление задачи
        this.addTask = (taskName, taskDesc) => {
            if (taskName) {
                if (taskDesc) {
                    const newItem = {
                        id: Math.random().toString(36).substring(2, 9),
                        taskTitle: taskName,
                        taskDescription: taskDesc,
                        pending: true,
                        in_progress: false,
                        done: false
                    }

                    this.setState(({ todos }) => {
                        const newArr = [...todos, newItem];

                        return {
                            todos: newArr
                        };
                    });
                };
            };
        };

        //удаление задачи
        this.removeTask = (id) => {
            this.setState(({ todos }) => {
                //находим индекс по id
                const index = todos.findIndex(element => element.id === id);

                //удаляем задачу с найденным индексом
                const newArray = [
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                ];

                return {
                    todos: newArray,
                };
            });
        };

        //поиск задачи
        this.onSearchChange = searchText => this.setState({ searchText });

        this.search = (items, searchText) => {
            if (searchText.length === 0) {
                return items;
            }
            return items.filter(
                item => item.taskTitle.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            );
        };

        //редактирование заголовка задачи
        this.editTaskName = (id, newTitle) => {
            this.setState(({ todos }) => {
                if (newTitle) {
                    const index = todos.findIndex(element => element.id === id);
                    todos[index].taskTitle = newTitle
                }

                return todos;
            });
        };

        //редактирование описания задачи
        this.editTaskDesc = (id, newDescription) => {
            this.setState(({ todos }) => {
                if (newDescription) {
                    const index = todos.findIndex(element => element.id === id);
                    todos[index].taskDescription = newDescription
                }
                return todos;
            });
        };

        //редактирование статуса задачи (индикация)
        this.editTaskStatus = (id, newStatus) => {
            this.setState(({ todos }) => {
                const index = todos.findIndex(element => element.id === id);

                if (newStatus === "pending") {
                    todos[index].pending = true;
                    todos[index].in_progress = false;
                    todos[index].done = false;

                }
                else if (newStatus === "in_progress") {
                    todos[index].pending = false;
                    todos[index].in_progress = true;
                    todos[index].done = false;
                }
                else if (newStatus === "done") {
                    todos[index].pending = false;
                    todos[index].in_progress = false;
                    todos[index].done = true;
                }

                return todos;
            });
        };

    }

    render() {
        const { todos, searchText } = this.state;
        const filteredData = this.search(todos, searchText);

        //создание интерфейса 
        //TodoForm - форма для создания задачи (название, описание), статус - pending (по-умолчанию)
        //TodoSearch - форма для поиска задач по названию
        //Tabs, TabList, Tab - теги для создания вкладок
        //Split - тег для создания панели изменения ширины списка наименований заметок
        //TodoItem - задача
        //TabPanel - панель редактирования информации о задаче

        return (
            <div className="TodoApp">
                <header>
                    <h1>Todo List App</h1>
                </header>
                <TodoForm addTask={this.addTask} />
                <TodoSearch onSearchChange={this.onSearchChange} />

                <Tabs>
                    <Split
                        direction="horizontal"
                        cursor="col-resize"
                        className="split-flex"
                    >
                        <TabList>
                            {filteredData.map(item => (
                                <Tab key={item.id}>
                                    <TodoItem
                                        taskTitle={item.taskTitle}
                                        taskDescription={item.taskDescription}
                                        pending={item.pending}
                                        in_progress={item.in_progress}
                                        done={item.done}
                                    />
                                </Tab>

                            ))}
                        </TabList>
                        <div>
                            {filteredData.map((todo) => {
                                const { taskNameInput } = this.state;
                                const { taskDescriptionInput } = this.state;

                                return (
                                    <TabPanel>
                                        <div className="panel-content">
                                            <h3>
                                                <div className="item-todo">
                                                    <div className="item-text">

                                                        <div name="taskTitle">
                                                            Task Title
                                                            <div style={{ marginTop: '20px' }}>
                                                                <input
                                                                    type="text"
                                                                    id="taskTitle"
                                                                    placeholder={todo.taskTitle}
                                                                    value={taskNameInput}
                                                                    onChange={(e) => this.editTaskName(todo.id, e.target.value)}
                                                                    style={{ color: 'white' }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div name="taskDescription" style={{ marginTop: '20px' }}>
                                                            Task Description
                                                            <div style={{ marginTop: '20px' }}>
                                                                <input
                                                                    type="text"
                                                                    id="taskDesc"
                                                                    value={taskDescriptionInput}
                                                                    placeholder={todo.taskDescription}
                                                                    onChange={(e) => this.editTaskDesc(todo.id, e.target.value)}
                                                                    style={{ color: 'white' }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="taskStatus" style={{ marginTop: '20px' }}>
                                                            Set status
                                                        </div>

                                                        <div className="statusRow" style={{ marginTop: '10px' }}>
                                                            <div class="statusColumn" onClick={(e) => this.editTaskStatus(todo.id, "pending")}>Pending</div>
                                                            <div
                                                                class="statusColumn"
                                                                style={{ background: '#608dff' }}
                                                                onClick={() => this.editTaskStatus(todo.id, "in_progress")}
                                                            >
                                                                In Progress
                                                            </div>
                                                            <div class="statusColumn" style={{ background: '#23a02d' }}
                                                                onClick={() => this.editTaskStatus(todo.id, "done")}
                                                            >
                                                                Done
                                                            </div>
                                                        </div>

                                                        <div className="item-delete"
                                                            type="submit"
                                                            onClick={() => this.removeTask(todo.id)}
                                                        >
                                                            Delete
                                                        </div>
                                                    </div>
                                                </div>
                                            </h3>
                                        </div>
                                    </TabPanel>
                                )
                            })}
                        </div>
                    </Split>
                </Tabs>
            </div>
        );
    }
}