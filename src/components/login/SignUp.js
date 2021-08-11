// https://blog.logrocket.com/user-authentication-firebase-react-apps/
// https://github.com/WebDevSimplified/React-Firebase-Auth

import React, { useRef, useState } from "react";
import { auth, generateUserDocument } from "../../lib/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Card, Form , Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Header from "../navbar/Header";


export default function SignUp() {
  const displayNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, signInWithGoogle } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  async function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match. Please try again.')
    }

    try{
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value);
      //generateUserDocument(user, {displayName});
      history.push("/profile")
    }
    catch(error){
      setError('Failed to create an account');
    }
    setLoading(false)
  };

  const handleGoogleSignUp = async(event) => {
    event.preventDefault();
    try{
      setError('')
      setLoading(true)
      await signInWithGoogle()
      history.push("/profile")
    } catch {
      setError('Failed to create an account using Google')
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
              <h2 className = "text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control 
                  type="text"
                  placeholder="Elon Musk" 
                  ref={displayNameRef}
                  // required
                  />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                  type="email"
                  placeholder="elon.musk@spacex.com" 
                  ref={emailRef}
                  required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                  type="password"
                  placeholder="**********" 
                  ref={passwordRef}
                  required />
                </Form.Group>
                <Form.Group id="passwordConfirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control 
                  type="password" 
                  placeholder="**********"
                  ref={passwordConfirmRef}
                  required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">Sign up</Button>
              </Form>
              <Button disabled={loading} className="w-100 bg-dark mt-2"
                onClick={handleGoogleSignUp}>Sign in with Google</Button>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Aready have an account? <Link to="/login">Log in here</Link>
          </div>
        </div>
      </Container>
    </>
  );
}