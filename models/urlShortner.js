const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const urlShortner = new Schema({
    actualUrl:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true,
        default: shortId.generate()
    },
    count:{
        type: Number,
        default: 0
    },
    created_at : Date,
    updated_at: Date

});


/**
 * to save date and time
 */
urlShortner.pre('save', function(next) {
    const currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});


const urlShortnerModel = mongoose.model('urlShortner', urlShortner);

module.exports = urlShortnerModel;