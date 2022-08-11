import React, { Component } from 'react'
import propTypes from 'prop-types';
import './TodoItem.css'

//задача
export default class TodoItem extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const {
            taskTitle,
            pending,
            in_progress,
            done
        } = this.props;


        //формирование названия класса индикатора статуса задачи (серый - ожидает, голубой - в процессе, зеленый - выполнена)
        //на основании сформированного названия класса применяется соответствующий стиль 
        var statusClassName = "dot";

        if (pending) {
            statusClassName += ' pending';
        } else if (in_progress) {
            statusClassName += ' inprogress';
        } else if (done) {
            statusClassName += ' done';
        }

        return (
            <div className="todo-item">
                <div>
                    <span className={statusClassName}></span>
                    <div className="item-text">
                        {taskTitle}
                    </div>
                </div>
            </div>
        )
    }
}

//статус задачи по-умолчанию - ожидает 
TodoItem.defaultProps = {
    pending: true,
    in_progress: false,
    done: false
};

//проверка типов
TodoItem.propTypes = {
    taskTitle: propTypes.string.isRequired,
    taskDescription: propTypes.string.isRequired,
    pending: propTypes.bool,
    in_progress: propTypes.bool,
    done: propTypes.bool,
};
