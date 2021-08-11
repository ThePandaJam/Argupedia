import React, { useState } from "react";
import { Row, Button, InputGroup, FormControl, Modal, Form, ButtonGroup } from "react-bootstrap";
import { firestore } from "../../lib/firebase";
import { BiPencil } from "react-icons/bi";

export default function AddNewPost() {
  const [title, setTitle] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    setSaving(true);

    const date = new Date();

    await firestore.collection("posts").add({
      title,
      upVotesCount: 0,
      downVotesCount: 0,
      createdAt: date.toUTCString(),
      updatedAt: date.toUTCString(),
    });

    handleClose();
    setTitle("");
    setSaving(false);
  };

  return (
    <>
      
    <Row onClick={handleShow} className="w-100 flex-start mb-3">
      <InputGroup size="lg">
        <InputGroup.Text><BiPencil /></InputGroup.Text>
        <FormControl as="textarea" aria-label="start-argument" placeholder = "Start a new debate" />
      </InputGroup>
    </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start a new debate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="debateTitle">
              <Form.Label>Topic of debate</Form.Label>
                <Form.Control 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="An interesting debate topic" 
                  required>

                </Form.Control>
            </Form.Group>
            <ButtonGroup>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit} disabled={!title.trim() || isSaving}>Post</Button>
            </ButtonGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
