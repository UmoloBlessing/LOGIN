import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/Components/Login';
import Response from '../src/Components/Response';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Response" element={<Response />} />
      </Routes>
    </Router>
  );
}

export default App;
