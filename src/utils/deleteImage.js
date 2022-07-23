const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'liushizi',
  api_key: '213641394383538',
  api_secret: 'IET8rNiF0I4HU674kpFDAJySYIE',
});

const cloudinaryDeleteImage = (name) => {
  cloudinary.uploader.destroy(name);
};
module.exports = cloudinaryDeleteImage;
