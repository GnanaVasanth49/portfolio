import React, { useState, useEffect } from 'react';
import './App.css';
import emailjs from 'emailjs-com'; // Import EmailJS
import githubLogo from './assets/github.png';
import linkedinLogo from './assets/LinkedIn_Logo.png';
import profileImage from './assets/Gnana vasanth.jpg';
import backgroundVideo from './assets/videos/background video.mp4';

function TypingAnimation({ phrases, typingSpeed, deletingSpeed, delay }) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          setTimeout(() => {
            setIsDeleting(true);
          }, delay);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, delay]);

  return (
    <h3 className="typing-effect">
      {displayText.split(' ').map((word, index) => {
        const colorClass = `color${(index % 3) + 1}`;
        return <span key={index} className={colorClass}>{word} </span>;
      })}
    </h3>
  );
}

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const emailAddress = 'gnanavasanthg.ug22.cs@francisxavier.ac.in'; // Updated email

  const handleNavigation = (section) => {
    setCurrentSection(section);
  };

  const handleCalculatorView = () => {
    window.location.href = "https://amber-charlena-30.tiiny.site/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission using EmailJS
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
console.log(formData)
    // Use EmailJS to send the form data
    emailjs
      .send('service_bd7tly9', 'template_qxws4q3', formData, 'F-fle-qZLbXessrmp') // Use your User ID here
      .then(
        (result) => {
          console.log(result.text); // Log the result
          setFormSubmitted(true); // Show success message if email is sent
          // Reset the form
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('Error:', error.text); // Log any errors that occur
        }
      );
  };

  // Function to open Gmail compose window with default recipient
  const handleEmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
    window.open(gmailUrl, '_blank');
  };

  const phrases = ['Software Engineer', 'Cyber Security Expert', 'Tech Enthusiast'];
  const greetingPhrase = ['Hello, I am', 'Gnana Vasanth'];

  return (
    <div className="App">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay container to hold the content */}
      <div className="overlay">
        <header className="header">
          <h1>My Portfolio</h1>
        </header>

        <nav className="navbar">
          <ul>
            <li><a href="#home" onClick={() => handleNavigation('home')}>Home</a></li>
            <li><a href="#about" onClick={() => handleNavigation('about')}>About Me</a></li>
            <li><a href="#skills" onClick={() => handleNavigation('skills')}>Skills</a></li>
            <li><a href="#projects" onClick={() => handleNavigation('projects')}>Projects</a></li>
            <li><a href="#contact" onClick={() => handleNavigation('contact')}>Contact</a></li>
          </ul>
        </nav>

        <div id="home" className="content">
          {currentSection === 'home' ? (
            <div className="home-section">
              <TypingAnimation 
                phrases={greetingPhrase} 
                typingSpeed={150} 
                deletingSpeed={100} 
                delay={2000} 
              />
              <TypingAnimation 
                phrases={phrases} 
                typingSpeed={150} 
                deletingSpeed={100} 
                delay={2000} 
              />
            </div>
          ) : currentSection === 'about' ? (
            <div className="about-section">
              <h2>ABOUT ME</h2>
              <img src={profileImage} alt="Profile" className="profile-image" />
              <p>
                I am a CSE engineering student studying in the 3rd year at
                Francis Xavier Engineering College. I have a strong passion for
                technology and programming, and I enjoy learning about new
                developments in the field.
              </p>
            </div>
          ) : currentSection === 'skills' ? (
            <div className="skills-section">
              <h2>SKILLS</h2>
              
              <div className="skills-category">
                <h3>LANGUAGES</h3>
                <ul>
                  <li>C</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
              </div>
              <div className="skills-category">
                <h3>Non-Technical Skills</h3>
                <ul>
                  <li>Leadership</li>
                  <li>Event Coordination</li>
                  <li>Communication</li>
                  <li>Teamwork</li>
                  <li>Problem Solving</li>
                </ul>
              </div>
            </div>
          ) : currentSection === 'projects' ? ( // Projects section
            <div className="projects-section">
              <div className="project-container">
                <h3 style={{ color: 'white' }}>CALCULATOR</h3>
                <p style={{ color: 'white' }}>
                  This project is a simple calculator built to perform basic arithmetic operations. 
                  Click "View" to interact with the live calculator or access the source code.
                </p>
                <button className="view-button" onClick={handleCalculatorView}>View</button>
                <a
                  href="https://github.com/andrewagain/calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-button"
                >
                  Source
                </a>
              </div>
              <div className="project-container">
                <h3 style={{ color: 'white' }}>PORTFOLIO WEBSITE</h3>
                <p style={{ color: 'white' }}>
                  A personal portfolio website developed using React.js, showcasing my skills, projects, and contact information.
                  It features a modern design with a video background and smooth animations.
                </p>
                <button className="view-button">View</button>
                <a
                  href="https://github.com/GnanaVasanth49/Reactjs-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-button"
                >
                  Source
                </a>
              </div>
              <div className="project-container">
                <h3 style={{ color: 'white' }}>CYBER SECURITY AWARENESS APP </h3>
                <p style={{ color: 'white' }}>
                  This application educates users about cybersecurity threats and safe practices through interactive quizzes and informative articles.
                  It aims to raise awareness and enhance user security online.
                </p>
                <button className="view-button">View</button>
                <a
                  href="https://github.com/GnanaVasanth49/Reactjs-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-button"
                >
                  Source
                </a>
              </div>
              {/* Add more project containers as needed */}
            </div>
          ) : (
            <div className="contact-section">
              <h2>CONTACT ME</h2>

              {/* Contact Form */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />

                <button type="submit" className="submit-button">Submit</button>
              </form>

              {/* Success Message */}
              {formSubmitted && <p>Thank you for your message! I will get back to you soon.</p>}

              {/* Social Media Links */}
              <div className="social-links">
                <a href="https://github.com/GnanaVasanth49">
                  <img src={githubLogo} alt="GitHub" />
                </a>
                <a href="https://linkedin.com/in/GnanaVasanth49">
                  <img src={linkedinLogo} alt="LinkedIn" />
                </a>
              </div>

              {/* Email Me Button */}
              <button onClick={handleEmail} className="email-button">Email Me</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
