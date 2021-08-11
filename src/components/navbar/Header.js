// https://github.com/dimitrisraptis96/chakra-ui-navbar/blob/main/src/components/Header.js

import React, { useContext, useState } from "react";
//import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { Navbar, Nav, Container, Row, ButtonGroup} from "react-bootstrap"
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";

export default function Header() {
  const user = useContext(UserContext)
  const [loggedIn, setLoggedIn] = useState(false)

  

  return (
    <Container className="w-100">
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand href="#"><Link to="/">Argupedia</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">How it works</Nav.Link>
              <Nav.Link href="#action2">Learn</Nav.Link>
            </Nav>
            <Nav>
              <ButtonGroup>
                <Nav.Link><Link className="btn btn-outline-primary"to="/login">Log in</Link></Nav.Link>
                <Nav.Link><Link className="btn btn-primary" to="/signUp">Sign Up</Link></Nav.Link>
              </ButtonGroup>
            </Nav>
              
          </Navbar.Collapse>
      </Navbar>
    </Container>
    
  )
}
