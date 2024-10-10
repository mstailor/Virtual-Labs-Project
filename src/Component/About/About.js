import React, { useState, useEffect } from 'react';
import './about.css'; 

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
                <div className="sec-nav">
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
                    <div className="about-img">
                        <img src="/about-img.jpg" alt="Image" />
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
