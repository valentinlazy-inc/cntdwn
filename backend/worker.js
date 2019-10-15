const throng = require('throng');
const Queue = require('bull');
const request = require('request');

// Connect to a local redis intance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
const workers = process.env.WEB_CONCURRENCY || 2;

// The maxium number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
const maxJobsPerWorker = 50;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
  // Connect to the named work queue
  const workQueue = new Queue('pushes', REDIS_URL);
  
  workQueue.process(maxJobsPerWorker, async (job) => {
    await new Promise((resolve, reject) => {
      request.post({
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
        },
        body: JSON.stringify(job.data),
      }, (err) => {
        console.error(err);
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
    
    return null;
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });
