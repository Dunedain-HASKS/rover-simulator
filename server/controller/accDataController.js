import AccData from "../models/accData.js";

const createAccData = async (req) => {
    try {
        const { acc_x, acc_y, acc_z } = req;
        const accData = new AccData({ x: acc_x, y: acc_y, z: acc_z });
        await accData.save();
        // res.status(201).json(accData);
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: error });
    }
}

const getAccData = async (req, res) => {
    try {
        const accData = await AccData.find();
        res.status(200).json(accData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getAccDataById = async (req, res) => {
    try {
        const accData = await AccData.findById(req.params.id);
        res.status(200).json(accData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getAccDataByTimeDuration = async (req, res) => {
    try {
        const accData = await AccData.find({ timestamp: { $gte: req.params.start, $lte: req.params.end } });
        res.status(200).json(accData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getAccDataLatest = async (req, res) => {
    try {
        const accData = await AccData.find().sort({ timestamp: -1 }).limit(1);
        res.status(200).json(accData);
    } catch (error) {
        // res.status(500).json({ error: error });
        console.error(error);
    }
}

const getAccDataLatestThree = async (req, res) => {
    try {
        const accData = await AccData.find().sort({ timestamp: -1 }).limit(10);
        res.status(200).json(accData);
    } catch (error) {
        // res.status(500).json({ error: error });
        console.error(error);
    }
}

export { createAccData, getAccData, getAccDataById, getAccDataByTimeDuration, getAccDataLatest, getAccDataLatestThree };