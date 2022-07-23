const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'liushizi',
  api_key: '213641394383538',
  api_secret: 'IET8rNiF0I4HU674kpFDAJySYIE',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Image',
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
