const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const hashPwd = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPwd // store hashed password
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Registration Successful'
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Login Successful',
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        });
    }
};

// Export the module
module.exports = { registerUser, login }; // Ensure this line is included
