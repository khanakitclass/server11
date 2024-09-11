const mongoose = require('mongoose');

const fillNoTrackerSchema = new mongoose.Schema({
    prefix: { type: String, required: true },
    lastSequenceNumber: { type: Number, default: 0 }
});

module.exports = mongoose.model('FillNoTracker', fillNoTrackerSchema);
