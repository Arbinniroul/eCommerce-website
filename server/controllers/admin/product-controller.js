const cloudinary = require('cloudinary').v2;
const { imageUploadUtil } = require('../../helpers/cloudinary');
const Product = require('../../models/Products'); // Import the Product model

// Handle image upload
const handleImageUpload = async (req, res) => {
    try {
        console.log('Received file:', req.file);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;
        const result = await imageUploadUtil(url);

        res.status(200).json({
            success: true,
            result
        });
    } catch (error) {
        console.error('Error in handleImageUpload:', error);
        res.status(500).json({ message: 'Failed to upload image' });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body;

        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        });
        
        await newProduct.save();
        
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct
        });
    } catch (error) {
        console.error('Error in addProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while adding product'
        });
    }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Error in fetchAllProducts:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while fetching products'
        });
    }
};

// Edit product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body;
        
        let product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        product.title = title || product.title;
        product.description = description || product.description;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.price = price===''?0:price || product.price;
        product.salePrice = salePrice===''?0:salePrice|| product.salePrice;
        product.totalStock = totalStock || product.totalStock;
        product.image = image || product.image;
        
        await product.save();
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        console.error('Error in editProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while editing product'
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while deleting product'
        });
    }
};

module.exports = {
    handleImageUpload,
    addProduct,
    editProduct,
    deleteProduct,
    fetchAllProducts
};
