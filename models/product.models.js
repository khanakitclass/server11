const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    unitOfMeasurement: {
        type: String,
        require: true
    },
    productFor: {
        type: String,
        require: true
    },
    mainCategory: {
        type: String,
        require: true
    },
    subCategory: {
        type: String,
        require: true
    },
    make: {
        type: String,
        require: true
    },
    specifiaction: {
        type: String,
        require: true
    },
    Desacription: {
        type: String,
        require: true
    },
    HSNcode: {
        type: String,
        require: true
    },
    taxdetails: {
        type: String,
        require: true
    },
    Warrentry: {
        type: String,
        require: true
    },
    Size: {
        type: String,
        require: true
    },
    Color: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('product', productSchema);