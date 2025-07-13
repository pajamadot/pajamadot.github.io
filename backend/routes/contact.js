const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.json({ success: true, message: 'Message received! We will get back to you soon.' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router; 