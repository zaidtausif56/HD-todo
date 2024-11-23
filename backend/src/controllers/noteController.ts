import { Request, Response } from 'express';
import supabase from '../supabaseClient';

export const createNote = async (req: Request, res: Response) => {
  const { userid, notedata } = req.body;
  console.log(req.body);
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
    .eq('id', noteid);

  if (error) {
    return res.status(500).send({ message: 'Error deleting note', error });
  }

  res.status(200).send({ message: 'Note deleted', data });
};

export const updateNote = async (req: Request, res: Response) => {
  const { noteid, completed } = req.body;
  const { data, error } = await supabase
    .from("notes")
    .update("completed", completed)
    .eq("id", noteid);
  if (error) {
    return res.status(500).send({ message: 'Error updating note', error });
  }

  res.status(200).send({ message: 'Update note', data });

};

export const viewNotes = async (req: Request, res: Response) => {
  const { userid } = req.body;
  console.log(userid);
  const { data, error } = await supabase
    .from("notes")
    .select("")
    .eq("userid", userid);

  if (error) {
    return res.status(500).send({ message: 'Error viewing note', error });
  }

  res.status(200).send({ message: 'View Notes', data });
};
