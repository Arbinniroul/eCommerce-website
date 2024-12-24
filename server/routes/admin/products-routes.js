const express = require('express');
const { upload, imageUploadUtils } = require('../../helpers/cloudinary'); // Import the image upload utils

const router = express.Router();
const {handleImageUpload,
        addProduct,
        editProduct,
        deleteProduct,
        fetchAllProducts}=require('../../controllers/admin/product-controller')

router.post('/upload-img', upload.single("my_file"), handleImageUpload)
router.post('/add', addProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/get',fetchAllProducts)

module.exports = router;
