// Importing required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

// Initialize the express application
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for cross-origin requests
app.use(cors());

// Contact form submission route
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Nodemailer transporter setup
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.PASSWORD, // Your email password or app-specific password
    },
  });

  // Email options
  let mailOptions = {
    from: email,
    to: process.env.EMAIL, // YOUR email where you will receive the message
    subject: `New Contact Form Submission from ${name}`,
    text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
