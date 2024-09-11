const mongoose = require('mongoose');

const commercialMarketingSchema = mongoose.Schema({
    fillNo: {
        type: String,
        require: true
    },
    PhoneNumber: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    City_Village: {
        type: String,
        require: true
    },
    District_Location: {
        type: String,
        require: true
    },
    Pincode: {
        type: Number,
        require: true
    },
    Latitude: {
        type: Number,
        require: true
    },
    Longitude: {
        type: Number,
        require: true
    },
    Amount: {
        type: Number,
        require: true
    },
    GST: {
        type: Number,
        require: true
    },
    TotalAmount: {
        type: Number,
        require: true
    },
    Date: {
        type: String,
        require: true
    },
    Dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dealer",
        require: true
    },
    DealerCommission: {
        type: Number,
        require: true
    },
    ConsumerNumber: {
        type: Number,
        require: true
    },
    ConnectionLoad: {
        type: Number,
        require: true
    },
    Tarrif: {
        type: Number,
        require: true
    },
    AverageMonthlyBill: {
        type: Number,
        require: true
    },
    GSTNumber: {
        type: Number,
        require: true
    },
    PanNumber: {
        type: Number,
        require: true
    },
    MSME_UdyamREGISTRATION: {
        type: Number,
        require: true
    },
    ConsumerName: {
        type: String,
        require: true
    },
    ContactPersonName: {
        type: String,
        require: true
    },
    PrimaryAmount: {
        type: Number,
        require: true
    },
    SolarAmount: {
        type: Number,
        require: true
    },
    CashAmount: {
        type: Number,
        require: true
    },
    SolarModuleMake: {
        type: Number,
        require: true
    },
    SolarModuleWp: {
        type: Number,
        require: true
    },
    SolarModuleNos: {
        type: Number,
        require: true
    },
    SystemSizeKw: {
        type: Number,
        require: true
    },
    InverterSize: {
        type: Number,
        require: true
    },
    DealerPolicy: {
        type: Number,
        require: true
    },
    MarketingType: {
        type: String,
        enum: ["Commercial Marketing", "Residential Marketing"],
        require: true,
    },
    Phase: {
        type: Number
    },

    applicationStatus: {
        type: String,
        require: true
    },
    feasibilityStatus: {
        type: String,
        require: true
    },
    fQGenrete: {
        type: Boolean,
        require: true
    },
    fqPaymentMode: {
        type: Boolean,
        require: true
    },
    fqPaid: {
        type: Boolean,
        require: true
    },
    fqPermission: {
        type: Boolean,
        require: true
    },
    // dealerpolicy: {
    //     type: String,
    //     require: true
    // },
    // solarModuleMake: {
    //     type: String,
    //     require: true
    // },
    // solarModulWp: {
    //     type: String,
    //     require: true
    // },
    // solarModuleNos: {
    //     type: String,
    //     require: true
    // },
    // systmSizeKw: {
    //     type: String,
    //     require: true
    // },
    // inventrySize: {
    //     type: String,
    //     require: true
    // },
    stamp: {
        type: Boolean,
        require: true
    },
    netMeterDocumennt: {
        type: Boolean,
        require: true
    },
    meterInstall: {
        type: Boolean,
        require: true
    },
    subcidyclaimed: {
        type: Boolean,
        require: true
    },
    subcidyRecieved: {
        type: Boolean,
        require: true
    },
    liasoningQuery: {
        type: Boolean,
        require: true
    },
    adharCard: {
        type: String,
        // require: true
    },
    lightBill: {
        type: String,
        // require: true
    },
    veraBill: {
        type: String,
        // require: true
    },
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Completed"
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('commercialMarketing', commercialMarketingSchema); 