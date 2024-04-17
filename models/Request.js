import mongoose from 'mongoose';

const date = new Date();
const month = date.getMonth();

const RequestSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    studentData: {
      type: Object,
      required: true,
    },
    currentSemester: {
      type: String,
      default: month >= 0 && month <= 6 ? 1 : 0,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    dateOfRequest: {
      type: String,
      default: Date.now,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', RequestSchema);
export default Request;
