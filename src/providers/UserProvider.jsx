//https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { Component, createContext } from "react";
import { auth } from "../lib/firebase";
import { generateUserDocument } from "../lib/firebase";

export const UserContext = createContext({ user: null, loggedIn: false });
class UserProvider extends Component {
  state = {
    user: null,
    loggedIn: false
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const currentUser = await generateUserDocument(userAuth);
      if (currentUser !== null) {
        this.setState({user: currentUser, loggedIn: true})
      } else {
        this.setState({user: currentUser, logedIn: false})
      }
      
      console.log("logged in is set to: ", this.state.loggedIn)
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user, this.state.loggedIn}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;