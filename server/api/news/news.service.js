const config = require('api/config.js');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const puppeteer = require ('puppeteer');

module.exports = {
    scrapeNews
};

async function scrapeNews(){
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    //scraping cnn
    await page.goto('https://www.cnn.com/');
    await page.screenshot({ path: `cnn${Date.now()}.png`})

    //scraping fox
    await page.goto('https://www.foxnews.com/');
    await page.screenshot({ path: `fox${Date.now()}.png`})

    await browser.close();
    return 
}
