const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const port = process.env.PORT || 5000;

//connecting to our database
mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
});


//setting the view ejs engine
app.set('view engine', 'ejs')

//using the url params
app.use(express.urlencoded({ extended: false}))

//the get method for home
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

//post request
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})


app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
});

//localhost of port 5000
app.listen(process.env.PORT || 5000); 