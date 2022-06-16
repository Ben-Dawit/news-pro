const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('api/_middleware/validate-request');
const authorize = require('api/_middleware/authorize');
const Role = require('api/_helpers/role');
const newsService = require('./news.service');

// routes
//note: all routes begin with /accounts. 
//EX: https://url.com/accounts/authenticate
router.get('/scrape', scrape);
router.get('/test', test);
router.get('/save', saveNews )
// router.get('/close', close)
// router.get('/open', open)

module.exports = router;

function test(req,res,next){
    res.status(200).json({
        message: "test successful!"
    })
    console.log("hi")
}

// function close(res,next){
//     newsService.closeBrowser()
//         .catch(next);
// }
// function open(res,next){
//     newsService.openBrowser()
//         .catch(next)
// }

//scrapes the news from www.cnn.com & www.foxnews.com
function scrape(req, res, next) {
    newsService.scrapeNews()
        .then(()=>res.json({
            message: "scrape successful"
        }))
        .catch(next);
}
//saves the news images to the cloud.
function saveNews(req,res,next){
    newsService.saveToS3()
        .then((cnn, fox) =>
            res.json({
                cnnLocation: cnn,
                foxLocation: fox
            })
        )
        .catch(next)
}