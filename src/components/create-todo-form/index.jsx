import React from 'react'
import PropTypes from 'prop-types'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class CreateTodoForm extends React.Component {
    state = {
        text: '',
        description: ''
    }
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = event => {
        event.preventDefault()
        this.props.createTodo(this.state)
        event.target.reset()
        this.setState({text: '', description: ''})
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Enter Task</Label>
                    <Input
                        placeholder="do some code"
                        name="text"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Describe Task</Label>
                    <Input
                        placeholder="write some short description about your task"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                    />
                </FormGroup>
                <Button type='submit' >Create Task</Button>
            </Form>
        )
    }
}
CreateTodoForm.propTypes = {
    createTodo: PropTypes.func.isRequired
}

export default CreateTodoForm