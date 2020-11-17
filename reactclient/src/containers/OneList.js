import React, { Component } from 'react';
import './App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../custom.scss';
import ToDoElement from "./ToDoElement";
import { listsFetchData, listUpdateData } from "../actions/lists";
import { connect } from "react-redux";
import { FormControl, InputGroup, Card, Button, Form } from 'react-bootstrap';

class OneList extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchData("/todo/"+id);
    }

    constructor(props) {
        super(props);
        this.state = {taskToAdd: ''};
    
        this.changeTaskToAdd = this.changeTaskToAdd.bind(this);
        this.addTask = this.addTask.bind(this);
      }

    markDone= task=>{
        task.isDone=!task.isDone;
        this.update();
    }

    deleteTask=id => {
        this.props.lists.todoElements = this.props.lists.todoElements.filter(task=>task._id!==id);
        this.update();
    }

    changeTaskToAdd(event){
        this.setState({taskToAdd: event.target.value});
    }

    addTask(event){
        event.preventDefault();
        this.props.lists.todoElements.push({task: this.state.taskToAdd, isDone: false});
        this.update();
    }

    update = () => {
        this.props.updateData("/todo/"+this.props.match.params.id, this.props.lists);
    };
    render(){
        
        return (
        <Card style={{ width: '35rem', marginTop: '20px' }}>
            <br/>
            <h2><em>{this.props.lists.name}</em></h2>
            <div className="p-2 col-example text-left" style={{ backgroundColor: '#F0F8F9' }}>
            <br/>
                { this.props.lists.todoElements?this.props.lists.todoElements.map((data, index) => {
                    return (<ToDoElement
                            key={data._id}
                            task={data.task}
                            isDone={data.isDone}
                            markDone={()=>this.markDone(data)}
                            remove={()=>this.deleteTask(data._id)}
                        />)
                    }):<p></p>}
                <Form onSubmit={this.addTask}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <Button variant="outline-secondary" type="submit">Ajouter</Button>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Votre tache à faire"
                            aria-label="Votre tache à faire"
                            name="newtask"
                            onChange={this.changeTaskToAdd}
                            required={true}
                        />
                    </InputGroup>
                </Form>
            </div>
          </Card>
        );
      }
    
    }


    const mapStateToProps = (state) => {
        return {
        lists: state.lists
        };
    };
    
    const mapDispatchToProps = dispatch => {
        return {
        fetchData: url => dispatch(listsFetchData(url)),
        updateData: (url, data)=> dispatch(listUpdateData(url, data))
        };
    };
  
export default connect(mapStateToProps, mapDispatchToProps)(OneList);