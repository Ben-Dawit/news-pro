const config = require('api/config.js');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const puppeteer = require ('puppeteer');
const fs = require('fs');
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({region: 'us-east-2'});
s3 = new AWS.S3();
// Load the SDK for JavaScript


module.exports = {
    scrapeNews,
    saveToS3
};


async function scrapeNews(){
    
    let today = new Date().toISOString().slice(0, 10)
    console.log(today);

    //name of cnn and fox files
    var cnnPath = `cnn${today}.png`;
    var foxPath = `fox${today}.png`;
    const foxPopUp = "#eb627c06237410f1288451ba37fc71e9 > div > div > div > button";


    //launching browser
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    
    //scraping cnn
    await page.goto('https://www.cnn.com/');
    page.setViewport({width: 960, height: 820})
    await page.screenshot({ path: cnnPath})

    //deletes cnn file (optional, used for development)
    // await fs.unlink(cnnPath);

    //scraping fox and bypassing popup
    await page.goto('https://www.foxnews.com/');
    page.setViewport({width: 960, height: 820})
    
    //fox sometimes has a popup you need to close by clicking the x button, this does that.
    
    await page.click(foxPopUp);
    await page.screenshot({ path: foxPath })

    await browser.close();

    return 
}
async function saveToS3(){
    let today = new Date().toISOString().slice(0, 10)
    //name of cnn and fox files\
    var cnnPath = `cnn${today}.png`;
    var foxPath = `fox${today}.png`;
    var cnnBlob = fs.readFileSync(`cnn${today}.png`);
    var foxBlob = fs.readFileSync(`fox${today}.png`);

    
    const cnnUploadedImage = await s3.upload({
        Bucket: config.s3.AWS_S3_BUCKET_NAME,
        Key: cnnPath,
        Body: cnnBlob,
    }).promise()

    const foxUploadedImage = await s3.upload({
        Bucket: config.s3.AWS_S3_BUCKET_NAME,
        Key: foxPath,
        Body: foxBlob,
    }).promise()

    return(cnnUploadedImage.location, foxUploadedImage.location)
}