import React from 'react';
import './style.scss';

const Loading = () => (
  <div className="loading-wrapper">
    <div className="spinner-border text-secondary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    Loading...
  </div>
);

export default Loading;
