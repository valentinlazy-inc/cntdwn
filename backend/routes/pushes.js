const express = require('express');
const request = require('request');
const router = express.Router();
require('dotenv').config();

/* POST save push token . */
router.post('/', function(req, res, next) {
  const { token, timerID } = req.body;
  
  if (!token || !timerID) {
    res.status(400).send();
  }
  
  const URL = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${timerID}`;
  request.post({
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
    },
  }, (err) => {
    console.error(err);

    res.status(201).send();
  });
});

module.exports = router;
