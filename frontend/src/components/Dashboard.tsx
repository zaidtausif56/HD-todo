import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNote, deleteNote, viewNotes } from "../api";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";
import placeholder from "../images/placeholder.jpg";
import logo from "../images/logo.png";

interface Note {
  id: string;
  notedata: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [response, setResponse] = useState("");
  const { accessToken, userData, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Protected route logic
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (accessToken) {
        try {
          setResponse("Fetching Notes!");
          const response = await viewNotes(accessToken);
          if (response.data.length === 0) {
            setResponse("No Notes Added!");
          }
          else {
            setResponse("");
          }
          setNotes(response.data);
        } catch (error) {
          console.error("Error fetching notes:", error);
          // Handle unauthorized access
          if ((error as any)?.response?.status === 401) {
            logout();
          }
        }
      }
    };
    fetchNotes();
  }, [accessToken, logout]);

  const handleCreateNote = async () => {
    if (!newNote.trim() || !accessToken) return;

    try {
      await createNote(accessToken, newNote, false);
      const response = await viewNotes(accessToken);
      setNotes(response.data);
      setNewNote("");
      setShowCreateNote(false);
    } catch (error) {
      console.error("Error creating note:", error);
      if ((error as any)?.response?.status === 401) {
        logout();
      }
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(accessToken, noteId);
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
      if ((error as any)?.response?.status === 401) {
        logout();
      }
    }
  };

  const handleSignOut = async () => {
    try {
      // Show confirmation dialog
      const confirmLogout = window.confirm(
        "Are you sure you want to sign out?"
      );

      if (confirmLogout) {
        logout();
      }
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashleft-column">
        <div className="dashtop">
          <div className="dashlogo">
            <div>
              <img src={logo} alt="HD Logo" className="logo-image" />
            </div>
            {/* <div className="icon">HD</div> */}
            <h3>Dashboard</h3>
          </div>
          <button
            className="dashsign-out"
            onClick={handleSignOut}
            aria-label="Sign out of your account"
          >
            Sign Out
          </button>
        </div>

        <div className="dashcontent">

          <div className="dashwelcome-card">
            <h2>Welcome, {userData?.name || "User"}!</h2>
            <p className="user-email">Email : {userData?.email}</p>
          </div>

          <button
            className="dashprimary-button"
            onClick={() => setShowCreateNote(true)}
          >
            Create Note
          </button>

          <div className="dashnotes-section">

            {(response === "") ? (<>
              <h2>Notes</h2>
              <div className="dashnotes-list">
                {notes.map((note) => (
                  <div key={note.id} className="dashnote-item">
                    <span className="dashnote-text">{note.notedata}</span>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="delete-button"
                      aria-label="Delete note"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div></>) : (<><h3 className="dashnote-response">{response}</h3></>)}
          </div>
        </div>
      </div>

      <div className="dashright-column">
        <div className="dashcontainer">
          <img
            src={placeholder}
            alt="Decorative waves"
            className="decorative-image"
          />
        </div>
      </div>

      {showCreateNote && (
        <div className="dashcreate-note-modal">
          <div className="dashmodal-content">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your note"
              className="dashnote-input"
            />
            <div className="dashmodal-actions">
              <button
                onClick={() => setShowCreateNote(false)}
                className="dashcancel-button"
              >
                Cancel
              </button>
              <button onClick={handleCreateNote} className="dashsubmit-button">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
