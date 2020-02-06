import React from 'react';
import './App.css';

import { Link } from 'react-router-dom';

const App = () => (
  <>
    <h3>
      Main page!
    </h3>
    <li><Link to="/test">Test API</Link></li>
  </>
);

export default App;
