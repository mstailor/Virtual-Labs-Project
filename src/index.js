import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './Component/About/About.js';
import Contact from './Component/Contact/Contact.js';
import Experiments from './Component/Experiment/Experiments.js'; 
import FeedbackForm from './Component/Feedback/Feedback.js'; 
import MergeSort from './Component/List/MergeSort.js'; 
import LinkedList from './Component/List/LinkedList.js'; 
import Stack from './Component/List/Stack.js'; 
import Probing from './Component/List/Probing.js'; 
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
      <Route path="/feedback/feedback-form" element={<FeedbackForm />} />
      <Route path="/list/merge" element={<MergeSort />} />
      <Route path="/list/linkedlist" element={<LinkedList />} />
      <Route path="/list/stack" element={<Stack />} />
      <Route path="/list/probing" element={<Probing />} />
    </Routes>
  </Router>
);
