const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Generate a unique secret for each user based on their user ID
const generateUniqueSecret = (user) => {
    return `SECRET_${user._id}`;  // Create a unique secret based on the user ID
};

// Register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) 
            return res.json({
                success: false,
                message: 'User already exists with the same email'
            });
        
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
const loginUser = async (req, res) => {
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

        // Generate a unique secret based on the user ID
        const secret = generateUniqueSecret(user);

        // Sign the JWT with the unique secret
        const token = jwt.sign(
            { id: user._id, roll: user.roll, email: user.email },
            secret, // Use user-specific secret
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'Login Successful',
            user: {
                email: user.email,
                roll: user.roll,
                id: user._id,
                userName: user.userName
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        });
    }
};

// Logout
const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logout successfully'
    });
};

// Separate Check Auth Function
const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized User!'
        });
    }

    try {
        const decoded = jwt.decode(token);
        const user = await User.findById(decoded.id); // Fetch user from DB

        // Include userName and other details as needed
        res.json({
            success: true,
            user: {
                email: user.email,
                userName: user.userName,
                roll: user.roll,
                id: user._id,
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized User!'
        });
    }
};


// Export the module
module.exports = { registerUser, loginUser, logoutUser, checkAuth };
