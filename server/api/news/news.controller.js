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
router.get('/scrape',  scrape);
router.get('/test', test);
router.get('/save', saveNews )

module.exports = router;

function test(req,res,next){
    res.status(200).json({
        message: "test successful!"
    })
    console.log("hi")
}

//scrapes the news from www.cnn.com & www.foxnews.com
function scrape(req, res, next) {
    newsService.scrapeNews()
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