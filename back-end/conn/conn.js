const mongoose = require('mongoose');

const conn = async (req, res) => {

    try {
        await mongoose.connect('').then(() => {
            console.log("connected")
        });
    } catch (error) {
        res.status(400).json({
            message: "not connected"
        });
    }

}
conn();