// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useState } from "react";
import { Link as ReachLink } from "@reach/router";
import { Link, Box, Flex, Text, Button, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { auth, signInWithGoogle, generateUserDocument } from "../../lib/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box textAlign="center">
                <Heading>Sign Up</Heading>
            </Box>
            <Box my={4} textAlign="left">
                {error !== null && (
                    <Text color="red">
                        {error}
                    </Text>
                )}
                <form>
                    <FormControl isRequired>
                        <FormLabel>Display Name</FormLabel>
                        <Input 
                        type="text" 
                        placeholder="Elon Musk"
                        name="displayName"
                        value = {displayName}
                        id="displayName"
                        onChange = {(event) => onChangeHandler(event)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input 
                        type="email" 
                        placeholder="elon.musk@spacex.com"
                        name="userEmail"
                        value = {email}
                        id="userEmail"
                        onChange = {(event) => onChangeHandler(event)} />
                    </FormControl>
                    <FormControl mt={6} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input 
                        type="password" 
                        name="userPassword"
                        value = {password}
                        id="userPassword"
                        placeholder="*******" 
                        onChange = {(event) => onChangeHandler(event)}/>
                    </FormControl>
                    <Button width="full" marginBottom="10px" mt={4} type="submit" onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}>
                        Sign Up
                    </Button>
                    <Button 
                      width="full" 
                      colorScheme="red" 
                      onClick={() => {
                        try {
                          signInWithGoogle();
                        } catch (error) {
                          console.error("Error signing in with Google", error);
                        }
                      }}>Sign in with Google</Button>
                    <Box my={4} textAlign="center">
                        <Text>Already have an account?</Text>
                        <Link as={ReachLink} colorScheme="blue" to = "/">Sign in here</Link>
                        <Text/>
                    </Box>
                </form>
            </Box>
        </Box>
    </Flex>
  );
};
export default SignUp;