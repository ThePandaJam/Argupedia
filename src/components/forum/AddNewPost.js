import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AddNewPost() {
  const {currentUser} = useAuth()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="w-100 flex-start mb-3 mt-3">
        {currentUser
          ?<Link to="/makeNewDebate" className="btn btn-primary"><BiPencil /> Start a new debate</Link> 
          :<Button variant="secondary" onClick={handleShow}><BiPencil /> Start a new debate</Button>
        }
      </div>
        <Modal className="flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log in or sign up to continue</Modal.Title>
          </Modal.Header>
          <Modal.Body className="align-items-center justify-content-center">
              Experience Argupedia to its fullest potential with an account
          </Modal.Body>
          <Modal.Footer>
            <Link to="/login" className="btn btn-primary">Log in</Link>
            <Link to="/signUp" className="btn btn-secondary">Sign up</Link>
          </Modal.Footer>
        </Modal>
    </>
  );
};
