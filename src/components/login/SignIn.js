// https://blog.logrocket.com/user-authentication-firebase-react-apps/
import React, {useState} from "react";
import { Link as ReachLink } from "@reach/router";
import { Link, Box, Flex, Text, Button, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const signInWithEmailAndPasswordHandler = 
            (event,email, password) => {
                event.preventDefault();
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Log in</Heading>
        </Box>
        <Box my={4} textAlign="left">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
          <form>
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
            <Button width="full" marginBottom="10px" mt={4} type="submit" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
              Sign In
            </Button>
            <Button width="full" colorScheme="red">Sign in with Google</Button>
            <Box my={4} textAlign="center">
                <Text>Don't have an account?</Text>
                <Link as={ReachLink} colorScheme="blue" to = "/signUp">Sign up here</Link>
                <Text/>
                <Link as={ReachLink} to = "/passwordReset">
                Forgot Password?
                </Link>
            </Box>
            
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
export default SignIn;