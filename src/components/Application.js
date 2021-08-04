// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useContext } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../providers/UserProvider";
import UserProvider from "../providers/UserProvider";

import ProfilePage from "./login/ProfilePage";
import PasswordReset from "./login/PasswordReset";
import SignIn from "./login/SignIn"
import SignUp from "./login/SignUp"



function Application() {
  const user = useContext(UserContext);
  return (
        user ?
        <ProfilePage path="profile" />
      :
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  );
}
export default Application;