import express from 'express';
import { createNote, deleteNote, viewNotes } from '../controllers/noteController';

const router = express.Router();

router.post('/create', createNote as any);
router.delete('/delete/:noteid', deleteNote as any);
router.post('/view', viewNotes as any);

export default router;
