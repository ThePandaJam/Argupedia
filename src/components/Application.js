// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import ProfilePage from "./login/ProfilePage";
import UpdateProfile from "./login/UpdateProfile";
import ForgotPassword from "./login/ForgotPassword";
import LogIn from "./login/LogIn"
import SignUp from "./login/SignUp"
import HomePage from "./forum/HomePage";
import PrivateRoute from "./login/PrivateRoute";
import MakeNewDebatePage from "./forum/MakeNewDebatePage";



function Application() {
  const user = useContext(UserContext);
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/updateProfile" component={UpdateProfile} />
          <PrivateRoute path="/makeNewDebate" component={MakeNewDebatePage} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </AuthProvider>
    </Router>

  );
}
export default Application;