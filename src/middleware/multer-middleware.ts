import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import { RequestHandler } from 'express';

const pathFolder = path.join(__dirname, '..', '..', 'img');

if (!fs.existsSync(pathFolder)) {
    fs.mkdirSync(pathFolder, { recursive: true });
}

export const imageUploader: RequestHandler = (() => {
    const diskConfig: StorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathFolder);
        },

        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const randString = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}${randString}${ext}`);
        },
    });

    const uploader = multer({ storage: diskConfig });

    return uploader.single('img');
})();
