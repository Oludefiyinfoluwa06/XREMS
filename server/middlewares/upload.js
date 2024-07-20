const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const profileStorage = new GridFsStorage({
    url: process.env.dbURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: `${Date.now() + file.originalname}`,
                bucketName: 'profile',
            }

            resolve(fileInfo);
        }).catch(err => {
            console.log(err);
        });
    }
});

const profileUpload = multer({
    storage: profileStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

const propertyStorage = new GridFsStorage({
    url: process.env.dbURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: `${Date.now() + file.originalname}`,
                bucketName: 'property',
            }

            resolve(fileInfo);
        }).catch(err => {
            console.log(err);
        });
    }
});

const propertyUpload = multer({ storage: propertyStorage }).array('pictures', 5);

module.exports = {
    profileUpload,
    propertyUpload
}