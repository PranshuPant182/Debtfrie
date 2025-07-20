const express = require('express');
const router = express.Router();
const users = require('../db/users');

// Simple login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in database
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

module.exports = router;