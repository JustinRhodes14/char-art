const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  try {
    await transporter.sendMail({
      from: `"Park LoFi Studio" <${process.env.SMTP_USER}>`,
      to: process.env.ARTIST_EMAIL,
      replyTo: email,
      subject: `New message from ${name} - Park LoFi Studio`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact email failed:', err.message);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
