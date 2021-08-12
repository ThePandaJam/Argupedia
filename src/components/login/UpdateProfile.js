// https://blog.logrocket.com/user-authentication-firebase-react-apps/
// https://github.com/WebDevSimplified/React-Firebase-Auth

import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Card, Form , Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Header from "../navbar/Header";


export default function UpdateProfile() {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        return setError('Passwords do not match. Please try again.')
      }

      const promises = []
      setLoading(true)
      setError('')
      if (emailRef.current.value !== currentUser.email){
          promises.push(updateEmail(emailRef.current.value))
      }
      if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
      }
  
      Promise.all(promises).then(() => {
          history.push('/profile')
      }).catch(() => {
          setError('Failed to update account')
      }).finally(() => {
          setLoading(false)
      })
    }

  return (
    <>
      <Header />
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
        >
        <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="userName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control type="text" ref={usernameRef} defaultValue={currentUser.username} />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder="leave blank to keep the same" />
                    </Form.Group>
                    <Form.Group id="passwordConfirm">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder="leave blank to keep the same" />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">Update</Button>
                </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/profile">Cancel</Link>
            </div>
        </div>
      </Container>
    </>
  );
};