const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename(req, file, callback) {
    const extension = path.extname(file.originalname);
    const originalName = file.originalname.split(extension)[0];
    const cleanedName = originalName.replace(/\s+/g, '-').toLowerCase();
    const filename = `${cleanedName}-${Date.now()}${extension}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

module.exports = { upload };
