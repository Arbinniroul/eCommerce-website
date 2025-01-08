const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !phone || !notes || !pincode) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        const newAddress = await Address.create({ userId, address, city, pincode, phone, notes });

        res.status(201).json({
            success: true,
            message: 'Address added successfully',
            data: newAddress,
        });
    } catch (error) {
        console.error('Error in addAddress:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }

        const addressList = await Address.find({ userId });

        res.status(200).json({
            success: true,
            message: 'Address fetched successfully',
            data: addressList,
        });
    } catch (error) {
        console.error('Error in fetchAllAddress:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const updateData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'User ID and Address ID are required',
            });
        }

        const updatedAddress = await Address.findOneAndUpdate(
            { _id: addressId, userId },
            updateData,
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: 'Address not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            data: updatedAddress,
        });
    } catch (error) {
        console.error('Error in editAddress:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'User ID and Address ID are required',
            });
        }

        const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId });

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: 'Address not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully',
            data: deletedAddress,
        });
    } catch (error) {
        console.error('Error in deleteAddress:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
