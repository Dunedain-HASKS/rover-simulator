import Rover from '../models/rover.js';


const createRover = async (req) => {
    try {
        const { latitude, longitude } = req;
        const rover = new Rover({ latitude, longitude });
        await rover.save();
        // res.status(201).json(rover);
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: error });
    }
}

const getRover = async (req, res) => {
    try {
        const rover = await Rover.find();
        res.status(200).json(rover);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getRoverById = async (req, res) => {
    try {
        const rover = await Rover.findById(req.params.id);
        res.status(200).json(rover);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getRoverByTimeDuration = async (req, res) => {
    try {
        const rover = await Rover.find({ timestamp: { $gte: req.params.start, $lte: req.params.end } });
        res.status(200).json(rover);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getRoverLatest = async (req, res) => {
    try {
        const rover = await Rover.find().sort({ timestamp: -1 }).limit(1);
        res.status(200).json(rover);
    } catch (error) {
        // res.status(500).json({ error: error });
        console.error(error);
    }
}

const getRoverLatestmqtt = async () => {
    try {
        const rover = await Rover.find().sort({ timestamp: -1 }).limit(1);
        // res.status(200).json(rover);
        return rover;
    } catch (error) {
        // res.status(500).json({ error: error });
        console.error(error);
    }
}

const getRoverLatestThree = async (req, res) => {
    try {
        const rover = await Rover.find().sort({ timestamp: -1 }).limit(3);
        res.status(200).json(rover);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export default { createRover, getRover, getRoverById, getRoverByTimeDuration, getRoverLatest, getRoverLatestThree, getRoverLatestmqtt };