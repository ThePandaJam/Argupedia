// https://blog.logrocket.com/user-authentication-firebase-react-apps/
// https://github.com/WebDevSimplified/React-Firebase-Auth

import React, { useState } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../../lib/firebase";
import { Container, Card, Form , Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'


const SignUp = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const history = useHistory()

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "userPasswordConfirm") {
      setPasswordConfirm(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  
  const handleSubmit = async (event, email, password, passwordConfirm) => {
    event.preventDefault();

    if(password !== passwordConfirm){
      return setError('Passwords do not match. Please try again.')
    }

    try{
      setError('')
      setLoading(true)
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
      history.push("/profile")
    }
    catch(error){
      setError('Failed to create an account');
    }

    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setDisplayName("");
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
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
      >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className = "text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={e => handleSubmit(e, email, password, passwordConfirm)}>
              <Form.Group>
                <Form.Label>Display Name</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Elon Musk" 
                name="displayName"
                value = {displayName}
                id="displayName"
                onChange = {(event) => onChangeHandler(event)}
                required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type="email"
                placeholder="elon.musk@spacex.com" 
                name="userEmail"
                value = {email}
                id="userEmail"
                onChange = {(event) => onChangeHandler(event)}
                required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password"
                placeholder="**********" 
                name="userPassword"
                value = {password}
                id="userPassword"
                onChange = {(event) => onChangeHandler(event)}
                required />
              </Form.Group>
              <Form.Group id="passwordConfirm">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="**********"
                name="userPasswordConfirm"
                value = {passwordConfirm}
                id="userPasswordConfirm"
                onChange = {(event) => onChangeHandler(event)}  
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
  );
};
export default SignUp;