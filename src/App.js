import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Make sure this points to your CSS file

const App = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [visitorCount, setVisitorCount] = useState(() => {
        let count = parseInt(localStorage.getItem('visitorCount')) || 0;
        localStorage.setItem('visitorCount', ++count);
        return count;
    });
    const [showObjective, setShowObjective] = useState(false);

    const carouselRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Handle image sliding
        const slideImage = () => {
            setImageIndex((prevIndex) => (prevIndex + 1) % 1); // Adjust this for number of images
        };

        intervalRef.current = setInterval(slideImage, 10000);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        // Handle time and date updates
        const updateTimeAndDate = () => {
            setCurrentTime(new Date());
        };

        updateTimeAndDate();
        const timerId = setInterval(updateTimeAndDate, 1000);
        return () => clearInterval(timerId);
    }, []);

    const handleImageClick = (direction) => {
        clearInterval(intervalRef.current);
        setImageIndex((prevIndex) =>
            direction === 'next'
                ? (prevIndex + 1) % 1 // Adjust this for number of images
                : (prevIndex - 1 + 1) % 1 // Adjust this for number of images
        );
        intervalRef.current = setInterval(() => handleImageClick('next'), 10000);
    };

    const handleContentToggle = (contentType) => {
        setShowObjective(contentType === 'objective');
    };

    return (
        <div>
            <div className="top">
                <div className="top-head">
                    <div className="time-date">
                        <span className="date">{currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        <span> | </span>
                        <span className="time">{currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span>
                    </div>
                    <div className="face-id">
                        Visitors <span id="visitor-count">{visitorCount}</span>
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
                            <li><a className="nav-link" href="#">Home</a></li>
                            <li><a className="nav-link" href="#">About</a></li>
                            <li><a className="nav-link" href="#">Experiments</a></li>
                            <li><a className="nav-link" href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main>
                <section className="wrapper">
                    <i className="fa-solid fa-arrow-left button" onClick={() => handleImageClick('prev')}></i>
                    <div className="image-container">
                        <div className="carousel" ref={carouselRef} style={{ transform: `translate(-${imageIndex * 100}%)` }}>
                            <img src="/Album/lab1.jpg" alt="Image 1" />
                            {/* Add more images here */}
                        </div>
                        <i className="fa-solid fa-arrow-right button" onClick={() => handleImageClick('next')}></i>
                    </div>
                </section>

                <section className="two">
                    <div className="contain-two">
                        <div className="tab">
                            <button onClick={() => handleContentToggle('philosophy')}>The AIM</button>
                            <button onClick={() => handleContentToggle('objective')}>Objective</button>
                        </div>
                        <div className="below-div">
                            {showObjective ? (
                                <div id="objective-content">
                                    <div className="topic-name">Objective</div>
                                    <div className="topic-bio">
                                        1. To enhance practical skills in designing, implementing, and analyzing data structures,
                                        enabling students to optimize algorithms and improve computational efficiency.<br /><br />

                                        2. To stay current with emerging trends and technologies in the field of data structures,
                                        ensuring that students are well-prepared for evolving industry demands and innovations.<br /><br />

                                        3. To develop critical thinking and analytical skills by evaluating the trade-offs and
                                        performance implications of different data structures in various computational contexts.
                                    </div>
                                </div>
                            ) : (
                                <div id="philosophy-content">
                                    <div className="topic-name">The Aim</div>
                                    <div className="topic-bio">
                                        Through this initiative, we aim to provide students with practical experience and innovative
                                        insights into optimizing algorithms and solving complex problems<br /><br /><br />
                                        Virtual labs are any place, any pace, any-time, any-type labs. It is a paradigm shift in
                                        student-centric, online education.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="three">
                    <div className="three-sec">
                        <div className="labs">Introduction About Virtual Labs</div><br /><br />
                        <iframe width="650" height="340" src="https://www.youtube.com/embed/Yhqyuv0336c?si=iLqOfWso36SXhScF"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">About RBU</a></li>
                        </ul>
                    </div>
                    <div className="foot-three">
                        Connect With US :
                        <ul>
                            <li>Email :- <a href="mailto:virtuallab2024@gmail.com">virtuallab2024@gmail.com</a></li>
                            <li>Contact :- <a href="tel:1234567890">1234567890</a></li>
                            <li>Address :- <a href="#">53G6+GCJ, Gittikhadan Rd,<br />BUPESHNAGAR, Nagpur,
                                Maharashtra<br />440013</a></li>
                        </ul>
                    </div>
                </div>
                <p>© 2024 Virtual Labs. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
