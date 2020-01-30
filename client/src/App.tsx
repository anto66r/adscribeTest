import React from 'react';
import './App.css';

import {
  Link
} from "react-router-dom";



const App: React.FC = () => {
  return (
    <>
      <h3>
        Main page!
      </h3>
      <Link to="/login">Login</Link>
    </>

  );
}

export default App;
