import express from 'express';
import {
  loginStudent,
  registerStudent,
  loginAdmin,
  registerAdmin,
} from '../controllers/auth.js';

const router = express.Router();

// USER
router.post('/user/login', loginStudent);
router.post('/user/register', registerStudent);

// ADMIN
router.post('/admin/login', loginAdmin);
router.post('/admin/register', registerAdmin);

export default router;
