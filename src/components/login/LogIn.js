// https://blog.logrocket.com/user-authentication-firebase-react-apps/
// https://github.com/WebDevSimplified/React-Firebase-Auth

import React, { useRef, useState } from "react";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Card, Form , Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Header from "../navbar/Header";


export default function LogIn() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, signInWithGoogle } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  async function handleSubmit(e) {
    e.preventDefault()

    try{
      setError('')
      setLoading(true)
      const currentUser = await login(emailRef.current.value, passwordRef.current.value)
      console.log("currentUser = ", currentUser)
      history.push("/")
    } catch {
      setError('Failed to sign in')
    }
    setLoading(false)
  }

  async function handleGoogleSignIn(e) {
    e.preventDefault()

    try{
      setError('')
      setLoading(true)
      const currentUser = await signInWithGoogle()
      console.log("currentUser = ", currentUser)
      history.push("/")
    } catch {
      setError('Failed to sign in using Google')
    }
    setLoading(false)
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
              <h2 className = "text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} placeholder="elon.musk@spacex.com" required />
                </Form.Group>
                <Form.Group id="password" className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} placeholder="**********" required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-2" type="submit">Log In</Button>
              </Form>
              <Button disabled={loading} className="w-100 bg-dark mt-2"
                onClick={handleGoogleSignIn}>Sign in with Google</Button>
              <div className="w-100 text-center mt-3">
                <Link to="/forgotPassword">Forgot password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/signup">Sign up here</Link> 
          </div>
        </div>
      </Container>
    </>
  );
};