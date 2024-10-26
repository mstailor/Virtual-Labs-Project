import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './index.css';

const Home = () => {
    return (
        <div>
            <TopSection />
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
};

// TopSection Component
const TopSection = () => {
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
    );
};

// Header Component
const Header = () => {
    return (
        <header>
            <div className="header-head">
                <div className="left-head">
                    <img className="vl-logo" src="/Sources/rbulogo.jpg" alt="Virtual Labs logo" />
                </div>
                <div className="right-head">
                    <form>
                        <input style={{ paddingRight: "10px" }} type="search" name="search-bar" id="searching" placeholder="Search lab" />
                    </form>
                </div>
            </div>
            <nav>
                <div className="nav">
                    <ul>
                        <li><a className="nav-link" href="/">HOME</a></li>
                        <li><a className="nav-link" href="/about">ABOUT US</a></li>
                        <li><a className="nav-link" href="/experiments">EXPERIMENTS</a></li>
                        <li><a className="nav-link" href="/contact">CONTACT US</a></li>
                    </ul>
                </div>
            </nav>

        </header>
    );
};

// MainContent Component
const MainContent = () => {
    return (
        <main>
            <ImageSlider />
            <TabContent />
            <VideoSection />
        </main>
    );
};

// ImageSlider Component
const ImageSlider = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const images = ['/Album/lab1.jpg']; // Add more image URLs as needed

    useEffect(() => {
        const autoSlide = () => {
            const intervalId = setInterval(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 10000);
            return () => clearInterval(intervalId);
        };

        autoSlide();
    }, [images.length]);

    const handleClick = (direction) => {
        setImageIndex((prevIndex) =>
            direction === 'next'
                ? (prevIndex + 1) % images.length
                : (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <section className="wrapper">
            <FaArrowLeft className="button" id="prev" onClick={() => handleClick('prev')} />
            <div className="image-container">
                <div className="carousel" style={{ transform: `translate(-${imageIndex * 100}%)` }}>
                    {images.map((src, index) => (
                        <img key={index} src={src} alt={`Slide ${index + 1}`} />
                    ))}
                </div>
            </div>
            <FaArrowRight className="button" id="next" onClick={() => handleClick('next')} />
        </section>
    );
};

// TabContent Component
const TabContent = () => {
    const [activeTab, setActiveTab] = useState('philosophy');

    return (
        <section className="two">
            <div className="contain-two">
                <div className="tab">
                    <button onClick={() => setActiveTab('philosophy')}>The AIM</button>
                    <button onClick={() => setActiveTab('objective')}>Objective</button>
                </div>
                <div className="below-div">
                    {activeTab === 'objective' && (
                        <div id="objective-content">
                            <div className="topic-name">Objective</div>
                            <div className="topic-bio">
                                1. To enhance practical skills in designing, implementing, and analyzing data structures, enabling students to optimize algorithms and improve computational efficiency.<br /><br />
                                2. To stay current with emerging trends and technologies in the field of data structures, ensuring that students are well-prepared for evolving industry demands and innovations.<br /><br />
                                3. To develop critical thinking and analytical skills by evaluating the trade-offs and performance implications of different data structures in various computational contexts.
                            </div>
                        </div>
                    )}
                    {activeTab === 'philosophy' && (
                        <div id="philosophy-content">
                            <div className="topic-name">The Aim</div>
                            <div className="topic-bio">
                                Through this initiative, we aim to provide students with practical experience and innovative insights into optimizing algorithms and solving complex problems<br /><br /><br />
                                Virtual labs are any place, any pace, any-time, any-type labs. It is a paradigm shift in student-centric, online education.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// VideoSection Component
const VideoSection = () => {
    return (
        <section className="three">
            <div className="three-sec">
                <div className="labs">Introduction About Virtual Labs</div><br /><br />
                <iframe
                    width="650"
                    height="340"
                    src="https://www.youtube.com/embed/AoUL3eb8iHs"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer>
            <div className="footer-head">
                <div className="foot-one">
                    <ul type="none">
                        <li>Quick Links</li>
                        <li><a href="#">Lab Feedback Form</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div className="foot-two">
                    <ul type="none">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="#">About RBU</a></li>
                    </ul>
                </div>
                <div className="foot-three">
                    Connect With US :
                    <ul type="none"><br />
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

export default Home;