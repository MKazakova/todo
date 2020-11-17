import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ToDoElement = props => {
    return (
        <div className="todo-element">
            <div className="mb-3">
                <Form.Check type="checkbox">
                    <Form.Check.Input type="checkbox" onChange={props.markDone} defaultChecked={props.isDone}/>
                    <Form.Check.Label  style={{textDecoration: props.isDone?'line-through':'None'}}>{props.task}</Form.Check.Label>
                    <FontAwesomeIcon icon={faTrashAlt} style={{cursor: 'pointer'}} className="float-right" onClick={props.remove}/>
                </Form.Check>
            </div>
        </div>
    )
}

export default ToDoElement;