// https://github.com/dimitrisraptis96/chakra-ui-navbar/blob/main/src/components/Header.js

import React, { useState } from "react";
import { Navbar, Nav, Container, ButtonGroup, NavDropdown, Alert} from "react-bootstrap"
import { BiLogOut } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const IMAGE = `http://detecta.com.br/admin/custom_img/unknown-user.png`;
const anonUser = 'Anonymous'

export default function Header() {
  const [error, setError] = useState("")
  const {currentUser, logout} = useAuth()
  const history = useHistory

  async function handleLogout(){
    setError('')

    try {
      await logout()
      history.push("/")

    } catch {
      setError("Failed to log out")
    }

  }

  return (
    <Container className="w-100">
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand><Link to="/">Argupedia</Link></Navbar.Brand>
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
              {currentUser
                ? <NavDropdown title="Profile" id="nav-dropdown">
                    <NavDropdown.Item>
                      {currentUser.displayName || anonUser}
                      <img src={currentUser.photoURL || IMAGE} alt="user" className="rounded-circle" width="30"/>
                    </NavDropdown.Item>
                    <NavDropdown.Item><Link to="/profile">View profile</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                        <BiLogOut /> Log out
                    </NavDropdown.Item>
                    {error && <Alert variant="danger">{error}</Alert>}
                  </NavDropdown>

                :<ButtonGroup>
                  <Link className="btn btn-outline-primary" to="/login">Log in</Link>
                  <Link className="btn btn-primary" to="/signUp">Sign Up</Link>
                </ButtonGroup>
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}
