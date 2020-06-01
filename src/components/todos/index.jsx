import React, {Component} from 'react'
import {Modal, ModalHeader, ModalBody} from 'reactstrap'

import Controller from '../controllers/'
import ListView from '../listview/'
import TableView from '../tableview/'
import CreateTodoForm from '../create-todo-form'
import shortid from 'shortid'

class Todos extends Component {
    state = {
        todos: [
            {
                id: '1',
                text: 'Todo text 1',
                description: 'Todo description 1',
                time: new Date(),
                isComplete: false,
                isSelect: false
            }, 
            {
                id: '2',
                text: 'Todo text 2',
                description: 'Todo description 2',
                time: new Date(),
                isComplete: false,
                isSelect: false
            }
        ],
        isOpenTodoFrom: false,
        searchTerm: '',
        view: 'list',
        filter: 'all'
    }
    toggleSelect = todoId => {
        const todos = [...this.state.todos]
        const todo = todos.find(t => t.id === todoId)
        todo.isSelect = !todo.isSelect

        this.setState({todos})
    }
    toggleComplete = todoId => {
        const todos = [...this.state.todos]
        const todo = todos.find(t => t.id === todoId)
        todo.isComplete = !todo.isComplete

        this.setState({todos})
    }
    toggleForm = () => {
        this.setState({
            isOpenTodoFrom: !this.state.isOpenTodoFrom
        })
    }
    handleSearch = value => {
        this.setState({
            searchTerm: value
        })
    }
    performSearch = () => {
        return this.state.todos.filter(todo => todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }
    createTodo = todo => {
        todo.id = shortid.generate()
        todo.time = new Date()
        todo.isComplete = false
        todo.isSelect = false

        this.setState({todos: [todo, ...this.state.todos]})
        this.toggleForm()
    }
    handleFilter = filter => {
        this.setState({
            filter
        })
    }
    performFilter = todos => {
        const {filter} = this.state
        if(filter === 'completed') {
            return todos.filter(todo => todo.isComplete) 
        } else if(filter === 'running') {
            return todos.filter(todo => !todo.isComplete)
        } else {
            return todos
        }
    }
    changeView = event => {
        this.setState({
            view: event.target.value
        })
    }
    clearSelected = () => {
        let todos = this.state.todos.filter(todo => !todo.isSelect)
        console.log(todos)
        this.setState({
            todos
        })
    }
    clearCompleted = () => {
        let todos = this.state.todos.filter(todo => !todo.isComplete)
        console.log(todos)
        this.setState({
            todos
        })
    }
    reset = () => {
        this.setState({
            view: 'list',
            searchTerm: '',
            filter: 'all',
            isOpenTodoFrom: false
        })
    }
    getView = () => {
        let todos = this.performSearch()
        todos = this.performFilter(todos)
        return this.state.view === 'list' ? (
            <ListView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        ) : (
            <TableView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        )
    }
    render() {
        return(
            <div>
                <h1 className='text-center display-4 mb-5'>Stack Todos</h1>
                <div>
                    <Controller
                        term={this.state.searchTerm}
                        handleSearch={this.handleSearch}
                        toggleForm={this.toggleForm}
                        handleFilter={this.handleFilter}
                        view={this.state.view}
                        changeView={this.changeView}
                        clearSelected={this.clearSelected}
                        clearCompleted={this.clearCompleted}
                        reset={this.reset}
                    />
                </div>
                <div>
                    {this.getView()}
                </div>
                <Modal 
                    isOpen={this.state.isOpenTodoFrom}
                    toggle={this.toggleForm}
                >
                    <ModalHeader toggle={this.toggleForm}>
                        Create New Todo Item
                    </ModalHeader>
                    <ModalBody>
                        <CreateTodoForm
                            createTodo={this.createTodo}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Todos
