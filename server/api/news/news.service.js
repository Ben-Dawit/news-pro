const config = require('api/config.js');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const puppeteer = require ('puppeteer');

module.exports = {
    scrapeCNN
};

async function scrapeCNN(){
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.cnn.com/');

    await page.screenshot({ path: 'screenshot.png'})
}
// async function scrapeFox(){
    
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.foxnews.com/')
// }