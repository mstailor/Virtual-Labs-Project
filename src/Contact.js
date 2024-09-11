import React, { useState, useEffect } from 'react';
import './contact.css'; 

const Contact = () => {
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
                    Contact Us
                </div>

                <section className="one">
                    <div className="home-tab-add">
                        <a href="/">Home</a>&nbsp;&nbsp;<strong>&gt;&gt;</strong> Contact us
                    </div>
                    <hr />
                    <div className="info-title">
                        <h2>Contact Us</h2>
                        <hr />
                        <p>
                            RBU Virtual Lab - <br />
                            Room No : DT-405 <br />
                            Ramdeobaba University, <br />
                            53G6+GCJ, Gittikhadan Rd, BUPESHNAGAR, <br />
                            Nagpur, Maharashtra 440013 <br />
                            Phone 📞 : +91 9999999999 <br />
                            Email 📧 : virtuallab2024@gmail.com <br />
                        </p>
                    </div>
                    <br /><br />
                    <div className="about-img"></div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.3989272794206!2d79.05856167565379!3d21.176305882693832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1006cc78ce9%3A0x37afa03de75a8708!2sRamdeobaba%20University%20(RBU)!5e0!3m2!1sen!2sin!4v1725981043128!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
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

export default Contact;
