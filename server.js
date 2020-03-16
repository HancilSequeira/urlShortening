const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortUrl = require('./models/urlShortner');

mongoose.connect('mongodb://mongo_docker/UrlShortner', { 
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.set('view engine','ejs');
app.use(express.urlencoded({ extended:false }));

app.get('/',(req, res) => {
    res.render('index')
});

app.post('/short-url',async(req, res) => {
    await shortUrl.create({ actualUrl: req.body.fullUrl});
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);


module.exports = app;