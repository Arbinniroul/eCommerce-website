const express = require('express');
const { upload, imageUploadUtils } = require('../../helpers/cloudinary'); // Import the image upload utils

const router = express.Router();
const {getFilterProducts,getProductDetails}=require('../../controllers/shop/productscontroller')


router.get('/get',getFilterProducts)
router.get('/get/:id',getProductDetails);

module.exports = router;
