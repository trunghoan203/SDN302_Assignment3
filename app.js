const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const { getAllStudents } = require('./models/infoStudent');

const cors = require('cors');
app.use(cors());

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/info', async (req, res) => {
    try {
        const students = await getAllStudents();

        // Filter to return only fullName and studentCode
        const studentInfo = students.map(student => ({
            fullName: student.fullName,
            studentCode: student.studentCode
        }));

        res.json({
            data: studentInfo
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching student data: ' + error.message });
    }
});

app.use('/students', studentRoutes);

module.exports = app;
