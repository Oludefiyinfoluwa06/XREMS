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

const profileUpload = multer({ storage: profileStorage });

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

const propertyUpload = multer({ storage: propertyStorage });

module.exports = {
    profileUpload,
    propertyUpload
}