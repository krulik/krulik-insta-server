"use strict";
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
router.get('/files/:fileName', (req, res) => {
    fs.readFile(`./files/${req.params.fileName}`, (err, data) => {
        if (err) {
            console.log(`error=[${err}]`);
            return;
        }
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
    });
});
router.post('/posts', upload.single('img'), (req, res) => {
    // mongo.save(post.id, {
    //   imgUrl: `files/${req.file.fileName}`
    // })
    res.send({ ...req.body, file: req.file });
});
module.exports = router;
