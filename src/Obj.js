import React, { useState } from 'react';
import './experiments.css';

function Experiments() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <Header />
    <div className="container">
      <div className="sub-header">
      <button className="toggle-button" onClick={toggleSidebar}>
      <img src="/Sources/toggle.jpg" alt="Toggle Sidebar" />
      </button>
        <a href="/">&nbsp;&nbsp;&nbsp;HOME&nbsp;&nbsp;&nbsp;</a>
        <a href="/about">|&nbsp;&nbsp;&nbsp;ABOUT US</a>
      </div>
      <div className="app-container">
      <div className="content">
        {isSidebarVisible && (
          <div className="sidebar">
              <ul>
                <li><a href="/experiments">Introduction</a></li>
                <li><a href="/obj">Objective</a></li>
                <li><a href="/list">List of experiments</a></li>
                <li><a href="/co">Course Outcome</a></li>
                <li><a href="/feedback">Feedback</a></li>
            </ul>
        </div>
        )}
    </div>
    <div>
    <main className="main-content">
        <h2>DATA STRUCTURE 1</h2>
        <br></br><br></br><br></br>
        <div className="intro-paragraph">
            <p>The Virtual Lab for Data Structures aims to create an
                interactive environment where students can explore data 
                structures. It complements lectures, reading materials, 
                and programming labs in three key ways:</p>
                <br></br><br></br>
                <ol>
                    <li>Providing visual animations of data structures.</li>
                    <li>Allowing students to execute algorithms interactively 
                    within these structures.</li>
                    <li>Enabling students to calculate the cost of using various 
                    data structures with different algorithms interactively.</li>
                </ol>
          </div>
        </main>
      </div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

const Header = () => {
  return (
      <header>
          <div className="header-head">
              <div className="left-head">
                  <img className="vl-logo" src="/Sources/rbulogo.jpg" alt="Virtual Labs logo" />
              </div>
              <div className="right-head">
                  <form>
                      <input type="search" name="search-bar" id="searching" placeholder="Search lab" />
                  </form>
              </div>
          </div>
      </header>
  );
};

const Footer = () => {
  return (
      <footer>
          <div className="footer-head">
              <div className="foot-one">
                  <ul>
                      <li><a href="#">Quick Links</a></li>
                      <li><a href="#">Lab Feedback Form</a></li>
                      <li><a href="#">FAQ</a></li>
                  </ul>
              </div>
              <div className="foot-two">
                  <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/about">About</a></li>
                      <li><a href="#">Contact</a></li>
                      <li><a href="#">About RBU</a></li>
                  </ul>
              </div>
              <div className="foot-three">
                  Connect With US :
                  <ul><br />
                      <li>Email :- <a href="#">virtuallab2024@gmail.com</a></li>
                      <li>Contact :- <a href="#">9999999999</a></li>
                      <li>Address :- <a href="#">53G6+GCJ, Gittikhadan Rd,<br />BUPESHNAGAR, Nagpur, Maharashtra<br />440013</a></li>
                  </ul>
              </div>
          </div>
          <p>© 2024 Virtual Labs. All rights reserved.</p>
      </footer>
  );
};

export default Experiments;