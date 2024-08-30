import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Ensure you import your CSS file

const App = () => {
  // State hooks
  const [imageIndex, setImageIndex] = useState(0);
  const [dateTime, setDateTime] = useState({ date: '', time: '' });
  const [visitorCount, setVisitorCount] = useState(0);
  const [activeTab, setActiveTab] = useState('objective');

  // Refs
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Image Slider Logic
  useEffect(() => {
    const carousel = carouselRef.current;
    const images = carousel ? carousel.querySelectorAll('img') : [];
    const totalImages = images.length;

    const slideImage = (index) => {
      setImageIndex(index);
      if (carousel) {
        carousel.style.transform = `translate(-${index * 100}%)`;
      }
    };

    const autoSlide = () => {
      intervalRef.current = setInterval(() => {
        slideImage((imageIndex + 1) % totalImages);
      }, 10000);
    };

    autoSlide();

    const handleMouseOver = () => clearInterval(intervalRef.current);
    const handleMouseLeave = () => autoSlide();

    if (carousel) {
      carousel.addEventListener('mouseover', handleMouseOver);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('mouseover', handleMouseOver);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearInterval(intervalRef.current);
    };
  }, [imageIndex]);

  // Time and Date Logic
  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
      const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

      setDateTime({
        date: now.toLocaleDateString('en-GB', optionsDate),
        time: now.toLocaleTimeString('en-GB', optionsTime)
      });
    };

    updateTimeAndDate();
    const intervalId = setInterval(updateTimeAndDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Visitor Count Logic
  useEffect(() => {
    const count = parseInt(localStorage.getItem('visitorCount')) || 0;
    setVisitorCount(count + 1);
    localStorage.setItem('visitorCount', count + 1);
  }, []);

  // Tab Switching Logic
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Top Section */}
      <div className="top">
        <div className="top-head">
          <div className="time-date">
            <span className="date">{dateTime.date}</span>
            <span> | </span>
            <span className="time">{dateTime.time}</span>
          </div>
          <div className="face-id">
            Visitors <span id="visitor-count">{visitorCount}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="/Sources/Face-logo.png" alt="Facebook logo" />
          </div>
        </div>
      </div>

      {/* Header Section */}
      <header>
        <div className="header-head">
          <div className="left-head">
            <img className="vl-logo" src="/Sources/vl-logo.jpg" alt="Virtual Labs logo" />
            <p className="title">
              An Initiative of<br />
              <span className="sec-line">Ministry of Education<br /></span>
              <span className="third-line">Under the National Mission on Education through <span className="red">ICT</span></span>
            </p>
          </div>
          <div className="right-head">
            <form>
              <input type="search" name="search-bar" id="searching" placeholder="Search lab" />
              <span><img src="/Sources/search logo.png" className="search-bar" alt="Search icon" /></span>
            </form>
          </div>
        </div>
        <nav>
          <div className="nav">
            <ul>
              <li><a className="nav-link" href="#">Home</a></li>
              <li><a className="nav-link" href="#">About</a></li>
              <li><a className="nav-link" href="#">Programs</a></li>
              <li><a className="nav-link" href="#">Events</a></li>
              <li><a className="nav-link" href="#">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <main>
        <section className="wrapper">
          <i
            id="prev"
            className="fa-solid fa-arrow-left button"
            onClick={() => setImageIndex((prev) => (prev - 1 + carouselRef.current.querySelectorAll('img').length) % carouselRef.current.querySelectorAll('img').length)}
          ></i>
          <div className="image-container">
            <div className="carousel" ref={carouselRef}>
              <img src="/Album/img1.jpg" alt="Image 1" />
              <img src="/Album/img2.png" alt="Image 2" />
              <img src="/Album/img3.png" alt="Image 3" />
              <img src="/Album/img4.jpg" alt="Image 4" />
              <img src="/Album/img5.jpg" alt="Image 5" />
              <img src="/Album/img6.jpg" alt="Image 6" />
              <img src="/Album/img7.png" alt="Image 7" />
            </div>
            <i
              id="next"
              className="fa-solid fa-arrow-right button"
              onClick={() => setImageIndex((prev) => (prev + 1) % carouselRef.current.querySelectorAll('img').length)}
            ></i>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="two">
          <div className="contain-two">
            <div className="tab">
              <button onClick={() => handleTabClick('objective')} className={activeTab === 'objective' ? 'active' : ''}>Objective</button>
              <button onClick={() => handleTabClick('philosophy')} className={activeTab === 'philosophy' ? 'active' : ''}>The Philosophy</button>
            </div>
            <div className="below-div">
              {activeTab === 'objective' && (
                <div id="objective-content">
                  <div className="topic-name">Objective</div>
                  <div className="topic-bio">
                    1. To provide remote-access to simulation-based Labs in various disciplines of Science and
                    Engineering.<br /><br />
                    2. To enthuse students to conduct experiments by arousing their curiosity. This would help
                    them in learning basic and advanced concepts through remote experimentation.<br /><br />
                    3. To provide a complete Learning Management System around the Virtual Labs where the
                    students/teachers can avail the various tools for learning, including additional
                    web-resources, video-lectures, animated demonstrations, and self-evaluation.
                  </div>
                </div>
              )}
              {activeTab === 'philosophy' && (
                <div id="philosophy-content">
                  <div className="topic-name">The Philosophy</div>
                  <div className="topic-bio">
                    Good lab facilities and updated lab experiments are critical for any engineering college.
                    Paucity of lab facilities often makes it difficult to conduct experiments. Also, good
                    teachers are always a scarce resource. The Virtual Labs project addresses this issue of lack
                    of good lab facilities, as well as trained teachers, by providing remote-access to
                    simulation-based Labs in various disciplines of science and engineering. Yet another
                    objective is to arouse the curiosity of the students and permit them to learn at their own
                    pace. This student-centric approach facilitates the absorption of basic and advanced
                    concepts through simulation-based experimentation. Internet-based experimentation further
                    permits use of additional web-resources, video-lectures, animated demonstrations, and
                    self-evaluation. Specifically, the Virtual Labs project addresses the following:<br /><br />
                    <ul>
                      <li>Access to online labs to those engineering colleges that lack these lab facilities</li>
                      <li>Access to online labs as a complementary facility to those colleges that already have labs</li>
                      <li>Training and skill-set augmentation through workshops and on-site/online training</li>
                    </ul>
                    <br /><br />
                    Virtual labs are any place, any pace, any-time, any-type labs. It is a paradigm shift in
                    student-centric, online education.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Broad Areas Section */}
        <section className="three">
          <div className="three-sec">
            <div className="labs">Broad Areas of Virtual Labs</div>
          </div>
          <div className="lab-link">
          <ul>
                    <li><a href="https://www.vlab.co.in/broad-area-electronics-and-communications">
                            📚&nbsp;Electronics & Communications</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-biotechnology-and-biomedical-engineering">
                            📚&nbsp;Biotechnology and Biomedical Engineering</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-computer-science-and-engineering">
                            📚&nbsp;Computer Science & Engineering</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-civil-engineering">
                            📚&nbsp;Civil Engineering</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-electrical-engineering">
                            📚&nbsp;Electrical Engineering</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-physical-sciences">
                            📚&nbsp;Physical Sciences</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-mechanical-engineering">
                            📚&nbsp;Mechanical Engineering</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-chemical-sciences">
                            📚&nbsp;Chemical Sciences</a></li>
                    <li><a href="https://www.vlab.co.in/broad-area-chemical-engineering">
                            📚&nbsp;Chemical Engineering</a></li>
                </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
