const Student = require('../models/studentModel');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const { name, studentCode, isActive } = req.body;
        const newStudent = new Student({ name, studentCode, isActive });
        await newStudent.save();
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: newStudent
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid student code format' });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong on the server' });
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong on the server' });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const { name, isActive } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, isActive },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: student
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid student code format' });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong on the server' });
    }
};
