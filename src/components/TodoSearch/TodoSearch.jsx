import './TodoSearch'
import React, { Component } from 'react';
import propTypes from 'prop-types';

//поиск задач
export default class TodoSearch extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
        };


        this.onSearchChange = (event) => {
            const text = event.target.value;
            this.setState({ text });
            this.props.onSearchChange(text);
        };
    }

    render() {
        return (
            <input
                type="text"
                className="search_input"
                placeholder="Search todo..."
                value={this.state.text}
                onChange={this.onSearchChange}
            />

        );
    }
}

//обязательное поле
TodoSearch.propTypes = {
    onSearchChange: propTypes.func.isRequired,
};