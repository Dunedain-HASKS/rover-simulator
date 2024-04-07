import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    images: {
        type: String,
    },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;