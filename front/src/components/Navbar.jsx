import React from "react";

import { Link, Redirect } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const navStyle = {
  textDecoration: "none",
  color: "white",
};

const title = {
  color: "red",
  fontSize: "30px",
};

const navHeader = {
  color: "white",
  marginTop: "10px",
  marginLeft: "80px",
};

const cartIcon = {
  position: "absolute",
  right: "25px",
  top: "26px",
};

export default (props) => {
  // console.log("PROPS NAVBAR", props);
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand style={title}>Canal Musical</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav>
            <button className="btn btn-dark">
              <Link to="/" style={navStyle}>
                <i className="fas fa-home"></i> Home
              </Link>
            </button>
          </Nav>
        </Nav>
        <Nav className="mr-auto">
          <Nav>
            <button onClick = {props.clearProductInStore} className="btn btn-dark">
              <Link to="/" style={navStyle}>
                <i className="fas fa-align-justify"></i> Products
              </Link>
            </button>
          </Nav>
        </Nav>

        {props.user.id ? (
          <React.Fragment>
            <Nav className="mr-auto">
              <React.Fragment>
                <Nav>
                  <Button className="btn btn-dark" onClick={props.handleLogout}>
                    <Link to="/logout" style={navStyle}>
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </Link>
                  </Button>
                  <h5 style={navHeader}>Welcome {props.user.nickname} ^_^</h5>
                </Nav>
              </React.Fragment>
            </Nav>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Nav className="mr-auto">
              <Nav>
                <button className="btn btn-dark">
                  <Link to="/register" style={navStyle}>
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </button>
              </Nav>
            </Nav>
            <Nav className="mr-auto">
              <Nav>
                <button className="btn btn-dark">
                  <Link to="/login" style={navStyle}>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </button>
              </Nav>
            </Nav>
          </React.Fragment>
        )}

        <Form
          onSubmit={props.handleSubmit}
          className="form-inline my-2 my-lg-0"
        >
          <FormControl
            type="text"
            placeholder="Busca tu producto"
            className="mr-sm-2"
            onChange={props.handleChange}
          />
          <button className="btn btn-dark" type="submit">
            <i className="fas fa-search"></i> Search
          </button>

          {/*  <Link to="/products">
            <Button variant="outline-info">Buscar</Button>
          </Link> */}
        </Form>
        <Nav className="mr-auto">
          <Nav style={cartIcon}>
            <Link to="/cart" style={navStyle}>
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </Nav>
        </Nav>
      </Navbar>
    </div>
  );
};
