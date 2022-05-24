// const fs = require('fs')
// const newsService = require('api/news/news.service');
const app = require("api/server")
const request = require("supertest")
// require('iconv-lite').encodingExists('foo'); //for some mySQL stuff


describe('initial test', () => {
    it.skip('Is testing newsService', () => {
        expect(true).toEqual(true);
    });
    it('gets test endpoint', done => {
        request(app)
            .get("/news/test")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200)
            .expect((res) => {
                res.body.data.message = "test successful!";
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});

// describe('News Scraping', () => {

//     it('Is scraping CNN and saving image', async done => {
//         await newsService.scrapeNews();
//         expect(fs.existsSync('api/news/screenshot.png')).toEqual(true);
//         done()
//     });
// });
