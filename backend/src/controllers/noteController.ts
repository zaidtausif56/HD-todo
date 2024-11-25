import { Request, Response } from 'express';
import supabase from '../supabaseClient';
<<<<<<< HEAD
import { AuthRequest } from '../middleware/auth';

export const createNote = async (req: AuthRequest, res: Response) => {
  const { notedata } = req.body;
  console.log(req.user);
  const userid = req.user;
=======

export const createNote = async (req: Request, res: Response) => {
  const { userid, notedata } = req.body;
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
  console.log(req.body);
  const { data, error } = await supabase
    .from('notes')
    .insert([{ userid, notedata, completed: false }]);

  if (error) {
<<<<<<< HEAD
    console.log(error);
=======
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
    return res.status(500).send({ message: 'Error creating note', error });
  }

  res.status(201).send({ message: 'Note created', data });
};

<<<<<<< HEAD
export const deleteNote = async (req: AuthRequest, res: Response) => {
=======
export const deleteNote = async (req: Request, res: Response) => {
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96

  if (error) {
    return res.status(500).send({ message: 'Error viewing note', error });
  }

  res.status(200).send({ message: 'View Notes', data });
};
