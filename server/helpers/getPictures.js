const { ObjectId } = require('mongoose').Types;

const getPictures = async (bucket, fileId) => {
    try {
        return new Promise((resolve, reject) => {
        const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
        let chunks = [];
            downloadStream.on('data', (chunk) => {
            chunks.push(chunk);
        });
        downloadStream.on('error', (err) => {
            reject(err);
        });
        downloadStream.on('end', () => {
            const image = Buffer.concat(chunks).toString('base64');
            resolve(`data:image/jpeg;base64,${image}`);
        });
    });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: { text: 'Unable to download file', error } });
    }
}

module.exports = {
    getPictures,
}