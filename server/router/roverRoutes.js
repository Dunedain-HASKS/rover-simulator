// roverRoutes.js
import express from 'express';
import roverController from '../controller/roverController';
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from rover routes');
});

router.post('/create', roverController.createRover);
router.get('/get', roverController.getRover);
router.get('/get/:id', roverController.getRoverById);
router.get('/get/:start/:end', roverController.getRoverByTimeDuration);

module.exports = router;