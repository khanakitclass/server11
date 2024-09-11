const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    multipleQty: [{
        recieveQty: {
            type: String,
        },
        total: {
            type: String,
        },
    }],
    storedate: {
        type: String,
    },
    Invoicenumber: {
        type: String,
    },
    Invoicedate: {
        type: String,
    },
    TransporterName: {
        type: String,
    },
    LRNumber: {
        type: String,
    },
    DriverName: {
        type: String,
    },
    DriverContactNumber: {
        type: String,
    },
    VehicleNumber: {
        type: String,
    },
    EwayBillNumber: {
        type: String,
    },
    Frieght: {
        type: String,
    },
    Remark: {
        type: String,
    },
    storeuploadFile: {
        type: String,
    },
    purchase: {
        type: String,
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


module.exports = mongoose.model('store', storeSchema);