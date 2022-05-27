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
    var cnnPath = `images/cnn${today}.png`;
    var foxPath = `images/fox${today}.png`;
    const foxPopUp = "#eb627c06237410f1288451ba37fc71e9 > div > div > div > button";


    //launching browser
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    
    //scraping cnn
    await page.goto('https://www.cnn.com/');
    page.setViewport({width: 960, height: 820})
    await page.waitForTimeout(3000)
    await page.screenshot({ path: cnnPath})

    // deletes cnn file (optional, used for development)
    // await fs.unlink(cnnPath);

    
    await page.goto('https://www.foxnews.com/');
    
    //fox sometimes has a popup you need to close by clicking the close popup button. 
    //this checks if the close popup button exists, then closes if necessary.
    if(await page.$(foxPopUp) === true){
        await page.click(foxPopUp);
    }
    await page.screenshot({ path: foxPath })

    await browser.close();
    return 
}
async function saveToS3(){
    let today = new Date().toISOString().slice(0, 10)
    //name of cnn and fox files
    var cnnPath = `images/cnn${today}.png`;
    var foxPath = `images/fox${today}.png`;
    var cnnBlob = fs.readFileSync(`images/cnn${today}.png`);
    var foxBlob = fs.readFileSync(`images/fox${today}.png`);

    
    const cnnUploadedImage = await s3.upload({
        Bucket: config.s3.bucketName,
        Key: cnnPath,
        Body: cnnBlob,
    }).promise()

    const foxUploadedImage = await s3.upload({
        Bucket: config.s3.bucketName,
        Key: foxPath,
        Body: foxBlob,
    }).promise()

    return(cnnUploadedImage.Location, foxUploadedImage.Location)
}
