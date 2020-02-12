import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from "features/login";
import { Logout } from "features/logout";
import { UserContext } from "context/UserContext";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Content from "components/Content";
import Roles from "features/roles";
import Users from "features/users/new";
import { getCookie } from "./helpers/cookies";
// import useGlobalState from "./state/index";
import { StoreProvider } from "store";
import reducers from "store/reducers";
import initialState from "store/initialState";

const App = () => {
  return (
    <>
      <Router>
        <StoreProvider initialState={initialState} reducer={reducers}>
          <Header />
          <Sidebar />
          <Content>
            <Route path="/users" component={Users} />
            <Route path="/roles" component={Roles} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Content>
          <Footer label="footer" />
        </StoreProvider>
      </Router>
    </>
  );
};

export default App;
