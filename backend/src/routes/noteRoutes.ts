import express from 'express';
import { createNote, deleteNote, viewNotes } from '../controllers/noteController';
<<<<<<< HEAD
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware as any);

=======

const router = express.Router();

>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
router.post('/create', createNote as any);
router.delete('/delete/:noteid', deleteNote as any);
router.post('/view', viewNotes as any);

export default router;
