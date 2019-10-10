const express = require('express');
const router = express.Router();
require('dotenv').config();
const request = require('request');

const { BitlyClient } = require('bitly');
const bitly = new BitlyClient(process.env.BITLY_API_KEY);

const timers = {};

/* GET timer by id. */
router.get('/:id', function(req, res, next) {
  if (timers[req.params.id]) {
    res.json(timers[req.params.id]);
  } else {
    res.status(404).send();
  }
});
/* POST save timer . */
router.post('/', async function(req, res, next) {
  const timer = {
    // id: Date.now(),
    ...req.body,
  };
  
  const URL = `${process.env.FRONTEND_URL}/t/${timer.id}`;
  
  console.log(URL);
  try {
    const endDate = new Date(timer.datetime);
    setTimeout(function() {
      request.post({
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
        },
        body: JSON.stringify({
          "notification": {
            "title": "cntdwn",
            "body": timer.finish_message || 'TIME IS OVER',
            "click_action": URL,
          },
          "to": `/topics/${timer.id}`
        }),
      }, (err) => {
        console.error(err);
      });
      }, endDate.getTime() - Date.now() - 1000);
    console.log('push in: ', endDate.getTime() - Date.now() - 1000);
  } catch (err) {
    console.error(err);
  }
  
  try {
    const response = await bitly.shorten(URL);

    res.json({
      ...timer,
      url: response.url,
    });
  } catch (err) {
    console.error(err);
    res.json({});
  }

  timers[timer.id] = timer;
});

module.exports = router;
