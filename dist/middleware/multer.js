"use strict";
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/files/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        const parts = file.originalname.split('.');
        const extension = parts[parts.length - 1];
        const fullName = file.fieldname + uniqueSuffix + '.' + extension;
        cb(null, fullName);
    }
});
module.exports = multer({ storage: storage });
