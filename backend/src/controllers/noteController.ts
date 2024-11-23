import { Request, Response } from 'express';
import supabase from '../supabaseClient';

export const createNote = async (req: Request, res: Response) => {
  const { userid, notedata } = req.body;

  const { data, error } = await supabase
    .from('notes')
    .insert([{ userid, notedata, completed: false }]);

  if (error) {
    return res.status(500).send({ message: 'Error creating note', error });
  }

  res.status(201).send({ message: 'Note created', data });
};

export const deleteNote = async (req: Request, res: Response) => {
  const { noteid } = req.params;

  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('noteid', noteid);

  if (error) {
    return res.status(500).send({ message: 'Error deleting note', error });
  }

  res.status(200).send({ message: 'Note deleted', data });
};
