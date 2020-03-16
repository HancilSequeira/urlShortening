const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./models/urlShortner');

mongoose.connect('mongodb://localhost/UrlShortner', { 
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.set('view engine','ejs');
app.use(express.urlencoded({ extended:false }));

app.get('/',async(req, res) => {
    const shortUrls = await shortUrl.find();
    res.render('index', { shortUrls: shortUrls })
});

app.get('/:url',async(req, res) => {
    try {
        const url = await shortUrl.findOne({ shortUrl: req.params.url });
        if(!url){
            res.sendStatus(404);
        } else {
            url.count++;
            console.log(shortUrl);
            url.save();
            res.redirect(url.actualUrl);
        }
    } catch(e) {
        console.log('e', e);
    }
});

app.post('/short-url',async(req, res) => {
    await shortUrl.create({ actualUrl: req.body.fullUrl});
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);


module.exports = app;