// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useState } from "react";
import { Link as ReachLink } from "@reach/router";
import { Link, Box, Flex, Text, Button, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";


const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = event => {
    event.preventDefault();
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Box textAlign="center">
        <Heading>Reset your Password</Heading>
      </Box>
      <Box my={4} textAlign="left">
      {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <form action="">
            {emailHasBeenSent && (
                <Text>
                An email has been sent to you!
                </Text>
            )}
            {error !== null && (
            <Text color="red">
              {error}
            </Text>
          )}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              placeholder="Enter your email"
              name="userEmail"
              value = {email}
              id="userEmail"
              onChange = {onChangeHandler} />
          </FormControl>
          <Button width="full" marginBottom="10px" mt={4} type="submit">
            Send me a reset link
          </Button>
          <Box my={4} textAlign="center">
              <Link as={ReachLink} colorScheme="blue" to = "/">Back to sign-in page</Link>
          </Box>
          
        </form>
      </Box>
    </Box>
  </Flex>
    // <div className="mt-8">
    //   <h1 className="text-xl text-center font-bold mb-3">
    //     Reset your Password
    //   </h1>
    //   <div className="border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
    //     <form action="">
    //       {emailHasBeenSent && (
    //         <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
    //           An email has been sent to you!
    //         </div>
    //       )}
    //       
    //       <label htmlFor="userEmail" className="w-full block">
    //         Email:
    //       </label>
    //       <input
    //         type="email"
    //         name="userEmail"
    //         id="userEmail"
    //         value={email}
    //         placeholder="Input your email"
    //         onChange={onChangeHandler}
    //         className="mb-3 w-full px-1 py-2"
    //       />
    //       <button
    //         className="w-full bg-blue-400 text-white py-3"
    //       >
    //         Send me a reset link
    //       </button>
    //     </form>
    //     <Link
    //      to ="/"
    //       className="my-2 text-blue-700 hover:text-blue-800 text-center block"
    //     >
    //       &larr; back to sign in page
    //     </Link>
    //   </div>
    // </div>
  );
};
export default PasswordReset;