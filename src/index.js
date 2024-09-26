import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Component/About/About';
import Contact from './Component/Contact/Contact';
import Experiments from './Component/Experiment/Experiments'; 
import Home from './Home';
import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/experiments" element={<Experiments />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
);
