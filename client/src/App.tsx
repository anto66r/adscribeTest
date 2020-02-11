import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from "features/login";
import { Logout } from "features/logout";
import { UserContext } from "context/UserContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Users from "./features/users";
import { getCookie } from "./helpers/cookies";
import useGlobalState from "./state/index";

const App = () => {
  // const [user, setUser] = useState({
  //   username: getCookie("CognitoUsername")
  // });
  // const [cognito, setCognito] = useState({});
  // const [remember, setRemember] = useState(false);
  const { state, dispatch } = useGlobalState();
  return (
    <>
      <Router>
        <UserContext.Provider
          value={{
            state,
            dispatch
          }}
        >
          <Header />
          <Sidebar />
          <Content>
            <h3>Main page!</h3>
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Content>
          <Footer label="footer" />
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
