const express = require('express');
const { registerUser, loginUser, logoutUser, checkAuth } = require('../../controllers/auth/authController');  // Make sure this import is correct
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/checkauth', checkAuth, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated User",
        user
    });
});

module.exports = router;
