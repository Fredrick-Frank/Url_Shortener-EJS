//calling in the libraries...
const mongoose = require('mongoose') //this is for connecting to the database mongodb
const shortId = require('shortid') //the shortid is for generating short url ids

//creating the schema
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    } 
})


module.exports = mongoose.model('ShortUrl', shortUrlSchema)