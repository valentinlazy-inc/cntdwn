const express = require('express');
const router = express.Router();
require('dotenv').config();

const Queue = require('bull');
const workQueue = new Queue('pushes', process.env.REDIS_URL);

const { BitlyClient } = require('bitly');
const bitly = new BitlyClient(process.env.BITLY_API_KEY);

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
    
    workQueue.add(
      timer.id,
      {
        "notification": {
          "title": "cntdwn",
          "body": timer.finish_message || 'TIME IS OVER',
          "click_action": URL,
        },
        "to": `/topics/${timer.id}`
      },
      {
        attempts: 1,
        delay: endDate.getTime() - Date.now() - 500,
        removeOnComplete: true,
      },
    );
    
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
});

module.exports = router;
