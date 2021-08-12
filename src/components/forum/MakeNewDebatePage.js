import React, { useState } from 'react'
import { Button, Container, Modal, Form, ButtonGroup } from "react-bootstrap";
import { firestore } from "../../lib/firebase";

import Header from '../navbar/Header'

//make tabs with different forms that correspond to schemes
//make a form for each scheme
//push data from form to firebase
//redirect to debate's page with the details loaded
export default function MakeNewDebatePage() {
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
            <Header />
            <Button onClick={handleShow} className="w-100 flex-start mb-3">Start a new debate</Button>
            <Container 
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
                >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <p>This is a post-making page</p>
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
                </div>
            </Container>
        </>
    )
}
