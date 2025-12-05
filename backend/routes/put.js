import express from 'express';
import { updateTask } from '../controllers/taskController.js';

const router = express.Router();


router.put("/tasks/:id", updateTask);

export default router;