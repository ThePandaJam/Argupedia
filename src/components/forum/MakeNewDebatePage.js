import React, { useState } from 'react'
import { Button, Container, Form, Row, Col, Nav, Tab } from "react-bootstrap";
import { firestore } from "../../lib/firebase";

import Header from '../navbar/Header'

//make tabs with different forms that correspond to schemes
//make a form for each scheme
//push data from form to firebase
//redirect to debate's page with the details loaded
export default function MakeNewDebatePage() {
    const [title, setTitle] = useState("");
    //const [scheme, setScheme] = useState("");
    const [majorPremise, setMajorPremise] = useState("");
    const [minorPremise, setMinorPremise] = useState("");
    const [conclusion, setConclusion] = useState("");
    const [isSaving, setSaving] = useState(false);

    const handleSubmit = async () => {
        setSaving(true);

        const date = new Date();

        await firestore.collection("posts").add({
        title,
        // scheme: scheme,
        major_premise: majorPremise,
        minor_premise: minorPremise,
        conclusion: conclusion,
        upVotesCount: 0,
        downVotesCount: 0,
        createdAt: date.toUTCString(),
        updatedAt: date.toUTCString(),
        });

        setTitle("");
        setMajorPremise("");
        setMinorPremise("");
        setConclusion("");
        setSaving(false);
    };

    return (
        <>
            <Header />
            <Container 
                className="flex align-items-center justify-content-center mt-4"
                style={{ minHeight: "100vh" }}
                >
                <div className="w-100" style={{ maxWidth: "800px" }}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="first" >Argument from a Position to Know</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="second" >Argument from Expert Opinion</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
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
                                        <Form.Group id="majorPremise">
                                        <Form.Label>Major premise</Form.Label>
                                            <Form.Control
                                            as="textarea"
                                            rows={3}
                                            type="text" 
                                            value={majorPremise}
                                            onChange={(e) => setMajorPremise(e.target.value)}
                                            placeholder="Source a is in a position to know about things in a certain domain S containing proposition A" 
                                            required>

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group id="minorPremise">
                                        <Form.Label>Minor premise</Form.Label>
                                            <Form.Control 
                                            as="textarea"
                                            rows={3}
                                            type="text" 
                                            value={minorPremise}
                                            onChange={(e) => setMinorPremise(e.target.value)}
                                            placeholder="a asserts that A is true/false" 
                                            required>

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group id="conclusion">
                                        <Form.Label>Conclusion</Form.Label>
                                            <Form.Control 
                                            type="text" 
                                            value={conclusion}
                                            onChange={(e) => setConclusion(e.target.value)}
                                            placeholder="A is true/false" 
                                            required>

                                            </Form.Control>
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSubmit} disabled={!title.trim() || isSaving}>Post</Button>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
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
                                        <Form.Group id="majorPremise">
                                        <Form.Label>Major premise</Form.Label>
                                            <Form.Control
                                            as="textarea"
                                            rows={3}
                                            type="text" 
                                            value={majorPremise}
                                            onChange={(e) => setMajorPremise(e.target.value)}
                                            placeholder="Source E is an expert in subject domain S containing proposition A" 
                                            required>

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group id="minorPremise">
                                        <Form.Label>Minor premise</Form.Label>
                                            <Form.Control 
                                            as="textarea"
                                            rows={3}
                                            type="text" 
                                            value={minorPremise}
                                            onChange={(e) => setMinorPremise(e.target.value)}
                                            placeholder="E asserts that proposition A is true/false" 
                                            required>

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group id="conclusion">
                                        <Form.Label>Conclusion</Form.Label>
                                            <Form.Control 
                                            type="text" 
                                            value={conclusion}
                                            onChange={(e) => setConclusion(e.target.value)}
                                            placeholder="A is true/false" 
                                            required>

                                            </Form.Control>
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSubmit} disabled={!title.trim() || isSaving}>Post</Button>
                                    </Form>                           
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </Container>
        </>
    )
}
