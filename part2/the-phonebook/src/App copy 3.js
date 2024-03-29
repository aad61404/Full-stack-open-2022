import React, { useState } from "react";

const Note = ({ note }) => {
  return <li>{note.name}</li>;
};

const App = (props) => {
  const [notes, setNotes] = useState([{ name: "Arto Hellas", id: 1,}]);
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newNote,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
    console.log('notes:', notes)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">add</button>
      </form>
      <h1>Numbers</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
