
import React from "react";

import { Link } from "react-router-dom";
import {Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

//const estilo = {
//  backgroundColor: 'white',
//  textDecoration:'none',
//  color: 'white'
//}

export default (props) => {
  {console.log(props)}
  return(
   
    <div >
      <Navbar bg="dark" variant="dark" fixed="top" >

        <Navbar.Brand >Ecommerce by TEAM</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav /*style={estilo}*/><Link to="/">Home</Link></Nav> 
        </Nav>
        <Nav className="mr-auto">
          <Nav ><Link to="/register">Register</Link></Nav> 
        </Nav>
        <Nav className="mr-auto">
          <Nav ><Link to="/login">Login</Link></Nav> 
        </Nav>
        <Nav className="mr-auto">
          <Button  variant="outline-info"><Link to="/logout">Logout</Link></Button>
        </Nav>
        
        <Form inline>
          <FormControl type="text" placeholder="Busca tu produ" className="mr-sm-2"/>
          <Button variant="outline-info">Buscar</Button>
        </Form>

      </Navbar>
          
    </div>
  )
};