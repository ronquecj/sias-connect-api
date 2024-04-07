import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';

// REGISTER
export const registerStudent = async (req, res) => {
  try {
    const {
      studentID,
      firstName,
      lastName,
      age,
      dateOfBirth,
      year,
      password,
      gender,
      phoneNumber,
    } = req.body;

    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    const newStudent = new Student({
      studentID,
      firstName,
      lastName,
      age,
      dateOfBirth,
      year,
      password: passwordHash,
      gender,
      phoneNumber,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const {
      schoolID,
      firstName,
      lastName,
      age,
      dateOfBirth,
      role,
      password,
      gender,
    } = req.body;

    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    const newAdmin = new Admin({
      schoolID,
      firstName,
      lastName,
      age,
      dateOfBirth,
      role,
      password: passwordHash,
      gender,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const loginStudent = async (req, res) => {
  try {
    const { studentID, password } = req.body;
    const student = await Student.findOne({ studentID: studentID });

    if (!student)
      return res.status(400).json({ msg: 'User does not exist.' });

    const isMatch = await bcryptjs.compare(
      password,
      student.password
    );

    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET
    );
    delete student.password;
    res.status(200).json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { schoolID, password } = req.body;
    const user = await Admin.findOne({ schoolID: schoolID });

    if (!user)
      return res.status(400).json({ msg: 'User does not exist.' });

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
