const app = require ("./server.js");
const newsService = require("./news/news.service");
const schedule = require ("node-schedule");

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));

const job = schedule.scheduleJob('0 0 0 * *', newsService.scrapeNews );