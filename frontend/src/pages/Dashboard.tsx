import React, { useState, useEffect } from "react";
import { createNote, deleteNote, viewNotes, updateNote } from "../api";

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<
    { id: string; notedata: string; completed: boolean }[]
  >([]);
  const [view, setviewNotes] = useState<
    { id: string; notedata: string; completed: boolean }[]
  >([]);
  const [noteData, setNoteData] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  //console.log(user);

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote(noteData, user.id, false);
      setNotes([...notes, newNote]);
      setNoteData("");
    } catch (error) {
      console.error(error);
      alert("Error creating note");
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error(error);
      alert("Error deleting note");
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleToggleCompleted = async (id: string, completed: boolean) => {
    try {
      await updateNote(id, completed);
    } catch (error) {
      console.error(error);
      alert("Error updating note");
    }
  };

  useEffect(() => {
    const GetNotes = async () => {
      console.log(user);
      if (JSON.stringify(user) === "{}") {
        window.location.href = "/login";
        alert("Not logged in.");
      } else {
        const userid = user.id;
        const res = await viewNotes(userid);
        //console.log(res.data);
        setviewNotes(res.data);
      }
    };
    GetNotes();
  }, [user]);

  return (
    <div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        <input
          type="text"
          placeholder="Enter note"
          value={noteData}
          onChange={(e) => setNoteData(e.target.value)}
        />
        <button onClick={handleCreateNote}>Create Note</button>
        <ul>
          {view.map((note) => (
            <li key={note.id}>
              <input
                type="checkbox"
                checked={note.completed}
                onChange={(e) =>
                  handleToggleCompleted(note.id, e.target.checked)
                }
              />
              {note.notedata}
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
