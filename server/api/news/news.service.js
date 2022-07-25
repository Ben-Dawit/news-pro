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


    //launching browser
    const browser = await puppeteer.launch({});
    
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    //scraping cnn
    await page.goto('https://www.cnn.com/');
    page.setViewport({width: 960, height: 820})
    await page.waitForTimeout(3000)
    await page.screenshot({ path: cnnPath})
    console.log("cnn screenshot complete")
    // deletes cnn file (optional, used for development)
    // await fs.unlink(cnnPath);

    
    await page.goto('https://www.foxnews.com/');
    
    //fox sometimes has a popup you need to close by clicking the close popup button. 
    //this checks if the close popup button exists, then closes if necessary.
    
    let foxNewsLetter = await page.evaluate(() => {
        let elements = document.getElementsByClassName(".pf-widget-close");

        return elements;
    });
    const [button] = await page.$x("//button[contains(., '×')]");
    if (button) {
        await button.click();
    }
    // const foxElon = "#\33 111078b5b9c1825e4e5c5f6116917e2 > div > div > div > button"
    // if(await page.$(foxNewsLetter) === true){ // for elon pop up, add htis back in '|| await page.$(foxElon) === true'
    //     await page.click(foxNewsLetter);
    //     console.log("attempted to click");
    // }
    // else{
    //     console.log("fox news letter not found")
    // }
    await page.screenshot({ path: foxPath })
    console.log("fox screenshot complete")

    // await browser.close();
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
        ContentType: 'image/png'
    }).promise()

    const foxUploadedImage = await s3.upload({
        Bucket: config.s3.bucketName,
        Key: foxPath,
        Body: foxBlob,
        ContentType: 'image/png'
    }).promise()

    return(cnnUploadedImage.Location, foxUploadedImage.Location)

}
