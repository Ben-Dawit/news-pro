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

module.exports = router;

function test(req,res,next){
    res.status(200).json({
        message: "test successful!"
    })
    console.log("hi")
}
function scrape(req, res, next) {
    newsService.scrapeNews()
        .then(() => {
            res.json({
                message: "scraped correctly!"
            });
        })
        .catch(next);
}
