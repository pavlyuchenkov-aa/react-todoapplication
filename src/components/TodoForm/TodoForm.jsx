import React, {Component} from 'react'
import propTypes from 'prop-types';
import './TodoForm.css'

//форма для создания задачи
export default class TodoForm extends Component {
    constructor() {
        super();
        
        this.state = {
            todoTitleLabel: '',
            todoDescriptionLabel: ''
        };

        //создание заголовка задачи
        this.onTitleChange = (event) => {
            this.setState({
                todoTitleLabel: event.target.value
            });
        };

        //создание описания задачи
        this.onDescriptionChange = (event) => {
            this.setState({
                todoDescriptionLabel: event.target.value
            });
        };

        //подтверждение создания задачи
        this.onSubmit = (event) => {
            event.preventDefault();
            this.props.addTask(this.state.todoTitleLabel, this.state.todoDescriptionLabel);
            this.setState({
                todoTitleLabel: '',
                todoDescriptionLabel: ''
            });
        };

        //обработка нажатия клавишы Enter для подтверждения создания задачи
        this.onKeyPress = (event) => {
            if (event.key === "Enter") {
                this.onSubmit(event)
            }
        }

    }

    render() {
        return (
            <form className = "todo-add-form" onSubmit={this.onSubmit}>
                <div className="taskTitle">
                    <input
                        value={this.state.todoTitleLabel}
                        type="text"
                        onChange={this.onTitleChange}
                        onKeyDown={this.onKeyPress}
                        placeholder="Enter task name"
                        style={{ marginTop: '20px' }}
                        required
                    />
                </div>

                <div className="taskDescription">
                    <input
                        value={this.state.todoDescriptionLabel}
                        type="text"
                        onChange={this.onDescriptionChange}
                        onKeyDown={this.onKeyPress}
                        placeholder="Enter task description"
                        style={{ marginTop: '20px' }}
                        required
                    />
                </div>

                <button type="submit" name = "addbtn">Add task</button>
            </form>
        )
    }
}

TodoForm.propTypes = {
    //обязательное свойство
    addTask: propTypes.func.isRequired,
};