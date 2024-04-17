import Request from '../models/Request.js';
import User from '../models/Student.js';
import mongoose from 'mongoose';

// CREATE REQUEST
export const newRequest = async (req, res) => {
  try {
    const { type, academicYear, quantity, id } = req.body;
    const user = await User.findById(id);

    const newRequest = new Request({
      type,
      academicYear,
      quantity,
      studentData: user,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { status: 'Approved' };

    const approve = await Request.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json(approve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET REQUEST
export const getRequest = async (req, res) => {
  try {
    const users = await Request.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET REQUEST BY ID
export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    const requests = await Request.find({
      'studentData._id': new ObjectId(id),
    }).exec();

    res.status(200).json({ count: requests.length, requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE REQUEST BY ID
export const deleteRequestByID = async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    const requests = await Request.deleteOne({
      _id: new ObjectId(id),
    }).exec();

    res.status(200).json({ count: requests.length, requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
