import React, { Component } from 'react';
import './App.css';
import OneList from './OneList.js';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../custom.scss';
import Lists from "./ListsSummary";
import {BrowserRouter, Route } from "react-router-dom";

class App extends Component {

  render(){
    
    return (
      <div className="App">
        <header>
          <div bg="light" expand="lg" className="justify-content-center">
            <h1 style={{ color: '#5E7477' }}>TODO LIST</h1>
          </div>
        </header>
        <Navbar bg="light" expand="lg">
          <Nav className="mr-auto">
            <Nav.Link href="/">Tous mes todo listes</Nav.Link>
          </Nav>
        </Navbar>
        <Container style={{ display: 'flex'}} className="justify-content-center">
          <BrowserRouter>
            <Route path='/' exact component={Lists}></Route>
            <Route path='/onelist/:id' exact component={OneList}></Route>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
  
}

export default App;
