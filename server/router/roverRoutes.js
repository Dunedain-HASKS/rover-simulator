// roverRoutes.js
import { Router } from "express";
const router = Router();
import roverController from '../controller/roverController.js';

// Define your routes here
router.get('/', (req, res) => {
    // Your route logic here
});

router.post('/create', roverController.createRover);
router.post('/temp', roverController.createTemp);
router.get('/get', roverController.getRover);
router.get('/get/:id', roverController.getRoverById);
router.get('/get/:start/:end', roverController.getRoverByTimeDuration);
router.get('/latest', roverController.getRoverLatest);
router.get('/latest3', roverController.getRoverLatestThree);

export default router;
