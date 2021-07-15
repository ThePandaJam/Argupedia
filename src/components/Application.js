// https://blog.logrocket.com/user-authentication-firebase-react-apps/

import ProfilePage from "./login/ProfilePage";
import PasswordReset from "./login/PasswordReset";
import SignIn from "./login/SignIn"
import SignUp from "./login/SignUp"
import { Router } from "@reach/router";


function Application() {
  const user = null;
  return (
        user ?
        <ProfilePage />
      :
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  );
}
export default Application;