import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5500;


// Middleware
app.use(cors({
  origin: 'https://sanjaykumar-tech.github.io'
}));

app.use(express.json()); // Use Express’s built-in JSON parser

// POST route
app.post('/send', async (req, res) => {
  const { name, email, subject, phone, message } = req.body;

   // Check if all required fields are present
   if (!name || !email || !subject || !phone || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
   }

// Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS// ⚠️ Use App Password here
    }
  });

  const mailOptions = {
    from: email,
    to: 'sanjaykumar.techdev@gmail.com',
    subject: `Portfolio Contact: ${subject}`,
    text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Subject: ${subject}
    Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Message failed to send' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
