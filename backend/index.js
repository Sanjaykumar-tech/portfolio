import express from 'express';
import cors from 'cors';
import { createTransport } from 'nodemailer';

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

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'sanjaykumar.techdev@gmail.com',
      pass: 'gthl ewbe bnfn sgkl' // ⚠️ Use App Password here
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
