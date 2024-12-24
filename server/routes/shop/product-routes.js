const express = require('express');
const { upload, imageUploadUtils } = require('../../helpers/cloudinary'); // Import the image upload utils

const router = express.Router();
const {getFilterProducts}=require('../../controllers/shop/productscontroller')


router.get('/get',getFilterProducts)

module.exports = router;
