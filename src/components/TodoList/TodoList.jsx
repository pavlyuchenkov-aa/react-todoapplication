import './TodoList.css'
import React from 'react';
import propTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import { Tab } from 'react-tabs';

//список задач
const TodoList = ({ items }) => {
    //инициализация вкладки с задачей
    const todos = items.map(item => (
        <Tab key={item.id}>
            <TodoItem
                taskTitle={item.taskTitle}
                taskDescription={item.taskDescription}
                pending={item.pending}
                in_progress={item.in_progress}
                done={item.done}
            />
        </Tab>

    ));
    return todos;
};

TodoList.propTypes = {
    items: propTypes.arrayOf(propTypes.shape)
};

//массив items пуст по-умолчанию
TodoList.defaultProps = {
    items: []
};

export default TodoList;
