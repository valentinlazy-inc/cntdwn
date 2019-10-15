const app = require('express')();
const { UI, setQueues } = require('bull-board');

const Queue = require('bull');
const workQueue = new Queue('pushes', process.env.REDIS_URL);

setQueues(workQueue);

app.use('/', UI);

const http = require('http');
const server = http.createServer(app);
server.listen(process.env.PORT || 8088);
