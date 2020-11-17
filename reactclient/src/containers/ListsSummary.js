import React, { Component } from 'react';
import { listsFetchData, listsRemoveData, listCreateData } from "../actions/lists";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { ListGroup, Button, Form, Modal} from 'react-bootstrap';
import { Link} from "react-router-dom";

class List extends Component {

    constructor(props) {
      super(props);
      this.state = {
        show: false,
        listToAddName: {},
        listToAddTasks: {}
      };
      this.changeListName = this.changeListName.bind(this);
      this.changeTasks = this.changeTasks.bind(this);
      this.saveNewList = this.saveNewList.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        this.props.fetchData("/todo");
    }

    deleteList= id => {
      this.props.removeData("/todo/"+id);
    }

    changeListName(event){
        this.setState({listToAddName: event.target.value});
    }

    changeTasks(event){
      this.setState({listToAddTasks: event.target.value});
    }

    saveNewList(event){
      let list = {
        name: this.state.listToAddName,
        todoElements: Object.keys(this.state.listToAddTasks).length === 0 && 
                      this.state.listToAddTasks.constructor === Object?[]:this.state.listToAddTasks.split("\n")
                      .map(name=>{
                            return {task: name, isDone: false}
                          })
      }
      this.props.createList("/todo", list);
      this.handleClose();
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    render(){

      
        return (
          
          <div className="App">
            <br/>
            <h2><em>Tous les listes</em></h2>
            <br/>
            <ListGroup variant="flush">
                {this.props.lists.map((list, index)=> {
                    return  <ListGroup.Item key={index}>
                              <div>
                              <Link to={{
                                  pathname: '/onelist/'+list._id
                                }}>{list.name} </Link> 
                                <FontAwesomeIcon icon={faTrashAlt} style={{cursor: 'pointer'}} className="float-right" onClick={()=>this.deleteList(list._id)}/>
                              </div>
                            </ListGroup.Item>
                })}
              <Button variant="secondary" onClick={this.handleShow}>
                Créer un nouveau todo liste
              </Button>
            </ListGroup>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Creation de nouveau toto liste</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nom de liste</Form.Label>
                  <Form.Control type="text" placeholder="Nom de liste" onChange={this.changeListName} required={true}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Les taches à faire (une tache par line, appuyez sur Enter)</Form.Label>
                  <Form.Control as="textarea" rows={5} onChange={this.changeTasks}/>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Fermer
                </Button>
                <Button variant="primary" onClick={this.saveNewList}>
                  Sauvegarder
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
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
          removeData: (url, id) => dispatch(listsRemoveData(url, id)),
          createList: (url, data) => dispatch(listCreateData(url, data))
        };
};
      
export default connect(mapStateToProps, mapDispatchToProps)(List);