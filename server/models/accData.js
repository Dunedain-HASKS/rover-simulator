import mongoose from 'mongoose';

const accDataSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    z: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const AccData = mongoose.model('AccData', accDataSchema);

export default AccData;