import express from 'express';
import { getUser } from '../controllers/student.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get('/:id', getUser);

// UPDATE

export default router;
