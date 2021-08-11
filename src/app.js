import React, { useEffect, useState } from "react";
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";

import { Router } from "@reach/router";
import AddNewPost from "./components/AddNewPost";
import Navbar from "./components/navbar/Header";
import Post from "./components/post";
import db from "./lib/firebase";
import { firestore } from "./lib/firebase";

import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
};

export default App;
