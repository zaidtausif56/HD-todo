import { Request, Response } from 'express';
import supabase from '../supabaseClient';
import { AuthRequest } from '../middleware/auth';

export const createNote = async (req: AuthRequest, res: Response) => {
  const { notedata } = req.body;
  console.log(req.user);
  const userid = req.user;
  console.log(req.body);
  const { data, error } = await supabase
    .from('notes')
    .insert([{ userid, notedata, completed: false }]);

  if (error) {
    console.log(error);
    return res.status(500).send({ message: 'Error creating note', error });
  }

  res.status(201).send({ message: 'Note created', data });
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  const { noteid } = req.params;

  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteid);

  if (error) {
    return res.status(500).send({ message: 'Error deleting note', error });
  }

  res.status(200).send({ message: 'Note deleted', data });
};

// export const updateNote = async (req: AuthRequest, res: Response) => {
//   const { noteid, completed } = req.body;
//   const { data, error } = await supabase
//     .from("notes")
//     .update("completed", completed)
//     .eq("id", noteid);
//   if (error) {
//     return res.status(500).send({ message: 'Error updating note', error });
//   }

//   res.status(200).send({ message: 'Update note', data });

// };

export const viewNotes = async (req: AuthRequest, res: Response) => {
  const userId = req.user;
  console.log(userId);
  const { data, error } = await supabase
    .from("notes")
    .select("")
    .eq("userid", userId);

  if (error) {
    return res.status(500).send({ message: 'Error viewing note', error });
  }

  res.status(200).send({ message: 'View Notes', data });
};
