const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if the user already exists
        // const existingUser = await User.findOne({ email });
        // if (existingUser) {
        //     return res.status(400).json({ message: "User already exists with this email" });
        // }

        // Hash the password with salt rounds
        const hashpassword = bcrypt.hashSync(password, 10); // Added salt rounds

        const user = new User({ email, username, password: hashpassword });

        await user.save().then(() => res.status(200).json({ message: "sign up successful" }))

    } catch (error) {
        console.log(error);
        res.status(200).json({ message: "User already exists with this email" });

    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(200).json({ message: "you are not register" });
        }

        // Compare password with hashed password
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Incorrect password" });
        }

        // Exclude the password from the response
        const { password: _, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
