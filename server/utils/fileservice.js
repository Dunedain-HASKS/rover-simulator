import { mongo, Types } from 'mongoose';
import { createReadStream, unlink } from 'fs';

export async function uploadFile({ file }) {
    const bucket = new mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'storage' });
    const uploadStream = bucket.openUploadStream(file.originalname, {
        metadata: {
            originalname: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
            encoding: file.encoding,
        }
    });
    return await new Promise((resolve, reject) => {
        createReadStream(file.path).pipe(uploadStream).on('close', () => {
            unlink(file.path, () => {
                resolve({
                    id: uploadStream.id.toHexString(),
                });
            });
        });
        uploadStream.on('error', (error) => {
            reject(error);
        });
    });
};

export async function retrieveFile({ fileId, stream }) {
    const _id = new Types.ObjectId(fileId);
    const bucket = new mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'storage' });
    const downloadStream = bucket.openDownloadStream(_id);
    return await new Promise((resolve, reject) => {
        downloadStream.pipe(stream).on('close', () => {
            resolve();
        });
        downloadStream.on('error', (error) => {
            reject(error);
        });
    });
};

