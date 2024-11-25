import express from 'express';
import { createNote, deleteNote, viewNotes } from '../controllers/noteController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware as any);

router.post('/create', createNote as any);
router.delete('/delete/:noteid', deleteNote as any);
router.post('/view', viewNotes as any);

export default router;
