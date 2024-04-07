import mongoose from 'mongoose';

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
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', RequestSchema);
export default Request;
