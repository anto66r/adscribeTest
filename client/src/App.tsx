import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import "./App.scss";
import Header from "./containers/Header";
import Footer from "./containers/Footer";
import Sidebar from "./containers/Sidebar";
import Content from "./containers/Content";
import Users from "./features/users";
import { LoginCallback } from "./containers/LoginCallback";

const App = () => (
  <>
    <Router>
      <Header />
      <Sidebar />
      <Content>
        <h3>Main page!</h3>
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/users" component={Users} />
      </Content>
      <Footer label="footer" />
    </Router>
  </>
);

export default App;
