const createRover = async (req, res) => {
    try {
        const { latitude, longitude, timestamp } = req.body;
        const rover = new Rover({ latitude, longitude });
        await rover.save();
        res.status(201).json(rover);
    } catch (error) {
        res.status(500).json({ error: error });
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

export default { createRover, getRover, getRoverById, getRoverByTimeDuration };