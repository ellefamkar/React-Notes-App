import { useState } from "react";
import "./App.css";
import AddNewNote from "./components/AddNewNote";
import NoteList from "./components/NoteList";
import NoteStatus from "./components/NoteStatus";
import NoteHeader from "./components/NoteHeader";

function App() {
  let [notes, setNotes] = useState([]);
  let [sortBy, setSortBy] = useState("latest");

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = (id) => {
    //Approach one
    // const filteredNote = notes.filter((note) => note.id !== id);
    // setNotes(filteredNote);

    //Approach Two
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleCompleteNote = (e) => {
    const noteId = Number(e.target.value);
    // const newNotes = notes.map((note) => note.id === noteId ? {...note, completed: !note.completed} :  note)
    // setNotes(newNotes);

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, completed: !note.completed } : note
      )
    );
  };

  return (
    <>
      <div className="container">
        <NoteHeader
          notes={notes}
          sortBy={sortBy}
          onSort={(e) => setSortBy(e.target.value)}
        />
        <div className="note-app">
          <AddNewNote onAddNote={handleAddNote} />
          <div className="note-container">
            <NoteStatus notes={notes} />
            <NoteList
              notes={notes}
              sortBy={sortBy}
              onDelete={handleDeleteNote}
              onComplete={handleCompleteNote}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
