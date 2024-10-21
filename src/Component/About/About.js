import React, { useState, useEffect } from 'react';
import './about.css';

import mohdImage from '../../Images/Mohd.png';
import kanakImage from '../../Images/Kanak.png';
import netalImage from '../../Images/Netal.jpg';
import himanshuImage from '../../Images/Himanshu.png';

const authors = [
    {
        name: "Kanak Meshram",
        image: kanakImage,
        description: "Second-year web development student in learning, focusing on creating modern, responsive websites with React and Node.js.",
        linkedin: "https://www.linkedin.com/in/kanak-meshram-7a875332a/",
    },
    {
        name: "Mohammed Tailor",
        image: mohdImage,
        description: "2nd-Year Engineering Student at Shri Ramdeobaba College | Learning Java, DSA, and Front-end Development | Aspiring in AIML.",
        linkedin: "https://www.linkedin.com/in/mohammed-tailor-002968288/",
    },
    {
        name: "Netal Sharma",
        image: netalImage,
        description: "Second-year UI/UX Designer who builds intuitive and user-friendly interfaces for web and mobile applications.",
        linkedin: "https://www.linkedin.com/in/netal-sharma-863356327/",
    },
    {
        name: "Himanshu Thakur",
        image: himanshuImage,
        description: "2nd year AI Student, which manage all event of Virtual lab , work on a team tu build a great product",
        linkedin: "https://www.linkedin.com/in/mark-wilson",
    },
];

const About = () => {
    const [timeAndDate, setTimeAndDate] = useState({
        date: '',
        time: '',
    });

    useEffect(() => {
        const updateTimeAndDate = () => {
            const now = new Date();
            const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
            const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

            setTimeAndDate({
                date: now.toLocaleDateString('en-GB', optionsDate),
                time: now.toLocaleTimeString('en-GB', optionsTime),
            });
        };

        updateTimeAndDate();
        const intervalId = setInterval(updateTimeAndDate, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const updateVisitorCount = () => {
            let count = parseInt(localStorage.getItem('visitorCount')) || 0;
            count++;
            localStorage.setItem('visitorCount', count);
            document.getElementById('visitor-count').textContent = count;
        };

        updateVisitorCount();
    }, []);

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true);
        }, 500); // Delay for the fade-in effect
    }, []);

    return (
        <div>
            <div className="top">
                <div className="top-head">
                    <div className="time-date">
                        <span className="date">{timeAndDate.date}</span>
                        <span> | </span>
                        <span className="time">{timeAndDate.time}</span>
                    </div>
                    <div className="face-id">
                        Visitors <span id="visitor-count">0</span>
                    </div>
                </div>
            </div>

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
                <nav>
                    <div className="nav">
                        <ul>
                            <li><a className="nav-link" href="/">HOME</a></li>
                            <li><a className="nav-link" href="/about">ABOUT US</a></li>
                            <li><a className="nav-link" href="/contact">CONTACT US</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                <div className="sec-nav" style={{width:"100%"}}>
                    About RBU, Nagpur - VIRTUAL LAB
                </div>

                <section className="one">
                    <div className="home-tab-add">
                        <a href="/">Home</a>&nbsp;&nbsp;<strong>&gt;&gt;</strong> About
                    </div>
                    <hr />
                    <div className="info-title">
                        <h2>Overview</h2>
                        <hr />
                        <p>
                            Virtual Labs project is a Data Structure Project which is made by Ramdeobaba University Students of 2nd year pursuing Artificial Intelligence & Machine Learning. This project is an activity of Ramdeobaba University.
                            <br /><br />
                            The intended beneficiaries of the projects are:
                            <ul>
                                <br />
                                <li>All students and Faculty Members of Science and Engineering Colleges who do not have access to good lab facilities and/or instruments.</li>
                                <br />
                                <li>High-school students, whose inquisitiveness will be triggered, possibly motivating them to take up higher studies.</li>
                                <br />
                                <li>Different engineering colleges who can benefit from the content and related teaching resources.</li>
                            </ul>
                            <br /><br />
                            Virtual Labs do not require any additional infrastructural setup for conducting experiments at user premises. The simulations-based experiments can be accessed remotely via the internet.
                        </p>
                    </div>
                    <br /><br />
                </section>

                <section className={`about-section ${fadeIn ? "fade-in" : ""}`}>
                    <h1 className="about-main-title">About the Creators</h1>
                    <div className="author-grid">
                        {authors.map((author, index) => (
                            <div key={index} className="author-card">
                                <div className="author-image">
                                    <img src={author.image} alt={author.name} />
                                </div>
                                <div className="author-details">
                                    <h2 className="author-name">{author.name}</h2>
                                    <p className="author-description">{author.description}</p>
                                    <a
                                        href={author.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-button"
                                    >
                                        Connect on LinkedIn
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

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
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="https://www.rknec.edu/">About RBU</a></li>
                        </ul>
                    </div>
                    <div className="foot-three">
                        Connect With US:
                        <ul>
                            <br />
                            <li>Email: <a href="#">virtuallab2024@gmail.com</a></li>
                            <li>Contact: <a href="#">1234567890</a></li>
                            <li>Address: <a href="#">53G6+GCJ, Gittikhadan Rd,<br />BUPESHNAGAR, Nagpur,<br />Maharashtra 440013</a></li>
                        </ul>
                    </div>
                </div>
                <p>© 2024 Virtual Labs. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
