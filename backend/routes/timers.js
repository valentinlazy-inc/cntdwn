const express = require('express');
const router = express.Router();

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
router.post('/', function(req, res, next) {
  const timer = {
    id: Date.now(),
    ...req.body,
  };
  
  
  res.json(timer);
  timers[timer.id] = timer;
});

module.exports = router;
