const mongoose = require('mongoose');

const dealerSchema = mongoose.Schema({
    ConsumerName: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        require: true
    },
    MarketingType: {
        type: String,
        enum: ["Commercial Marketing", "Residential Marketing"],
        require: true,
    },
    adharCard: {
        type: String,
        require: true
    },
    lightBill: {
        type: String,
        require: true
    },
    veraBill: {
        type: String,
        require: true
    },
    PhoneNumber: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('dealer', dealerSchema);                
