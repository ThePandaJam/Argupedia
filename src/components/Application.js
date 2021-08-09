// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import ProfilePage from "./login/ProfilePage";
import ForgotPassword from "./login/ForgotPassword";
import LogIn from "./login/LogIn"
import SignUp from "./login/SignUp"
import PrivateRoute from "./login/PrivateRoute";



function Application() {
  const user = useContext(UserContext);
  return (
    <Router>
        <Switch>
          <PrivateRoute path="/profile" component={ProfilePage} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/forgotPassword" component={ForgotPassword} />
        </Switch>
    </Router>

  );
}
export default Application;