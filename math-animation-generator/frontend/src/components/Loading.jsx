// src/components/Loading.js
import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Generating...</p>
    </div>
  );
};

export default Loading;
