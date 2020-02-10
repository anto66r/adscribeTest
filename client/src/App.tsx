import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { LoginCallback } from "./components/LoginCallback";
import Users from "./features/users";

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
