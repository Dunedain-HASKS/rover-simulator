import mongoose from 'mongoose';

const roverSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  } 
});

const Rover = mongoose.model('Rover', roverSchema);

export default Rover;