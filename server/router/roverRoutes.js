// roverRoutes.js
import { Router } from "express";
const router = Router();
import roverController from '../controller/roverController';

// Define your routes here
router.get('/', (req, res) => {
    // Your route logic here
});

router.post('/create', roverController.createRover);
router.get('/get', roverController.getRover);
router.get('/get/:id', roverController.getRoverById);
router.get('/get/:start/:end', roverController.getRoverByTimeDuration);

module.exports = router;
