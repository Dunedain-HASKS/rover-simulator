// roverRoutes.js
import { Router } from "express";
const router = Router();
import {
    createAccData,
    getAccData,
    getAccDataById,
    getAccDataByTimeDuration,
    getAccDataLatest,
    getAccDataLatestThree
} from '../controller/accDataController.js';

// Define your routes here
router.get('/', (req, res) => {
    // Your route logic here
});

router.post('/create', createAccData);
router.get('/get', getAccData);
router.get('/get/:id', getAccDataById);
router.get('/get/:start/:end', getAccDataByTimeDuration);
router.get('/latest', getAccDataLatest);
router.get('/latest3', getAccDataLatestThree);

export default router;