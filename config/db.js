const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://caotrunghoan2003:Trunghoan2003@assignment3.vlynr.mongodb.net/?retryWrites=true&w=majority&appName=assignment3");
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;