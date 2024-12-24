
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
cloudinary.config({
    cloud_name: 'dgmyae27k',
    api_key: '657471672659134',
    api_secret: '3a1MiVER-0rm1k408NFDSvU83to',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
  });

  return {
      url: result.secure_url,  // Return the URL here
      public_id: result.public_id
  };
}


const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };