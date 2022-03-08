const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const processorSchema = new Schema({
    sku: {
        type: String,
        required: true,
        part: { unique: true }
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 90000
    }
});

const Processor = mongoose.model('Processor', processorSchema);
module.exports = Processor;