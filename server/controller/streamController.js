import { uploadFile, retrieveFile } from '../utils/fileservice.js';
import Video from '../models/video.js';

const streamController = {

    get_profilepic: async (req, res) => {
        const { id } = req.params;
        await retrieveFile({ fileId: id, stream: res });
        // res.set('content-typee', 'image / png', 'image / jpg')
    },
    profilepic: async (req, res) => {

        const im = await Video.updateOne({ images: id }, { new: true }, { upsert: true });
        // console.log(stu);
        if (im) {
            res.json({
                message: 'File uploaded successfully',
                fileId: id,

            });
        }
        else {
            res.json({
                message: 'File not uploaded',
                fileId: id,
            });
        }
    },


};

export default streamController;