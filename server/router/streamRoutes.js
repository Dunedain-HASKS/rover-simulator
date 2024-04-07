import { Router } from 'express';
const fileRouter = Router();
import multer, { diskStorage } from 'multer';
import streamController from '../controller/streamController.js';

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const hex = Buffer.from(Date.now().toString()).toString('hex');
        cb(null, hex);
    }
});

const upload = multer({ storage });

fileRouter.get('/stream/:id', streamController.get_profilepic);

fileRouter.post('/stream', upload.single('file'), streamController.profilepic);

export default fileRouter;