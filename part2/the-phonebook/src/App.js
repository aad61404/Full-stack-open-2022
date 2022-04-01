import React, { useState } from "react";

const Note = ({ note }) => {
  return (
    <>
      <li>{note.name} {note.phoneNumber}</li>
    </>
  );
};

const App = (props) => {
  const [notes, setNotes] = useState([{ name: "Arto Hellas", id: 1, phoneNumber: '09123456789' }]);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newNote,
      id: notes.length + 1,
      phoneNumber: phoneNumber
    }

    if (checkNotes(newNote)) {
      alert(newNote + 'is already added to phonebook')
    } else {
      setNotes(notes.concat(noteObject))
      setNewNote('')
      setPhoneNumber('')
    }
    console.log('notes:', notes)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const checkNotes = (name) => {
    if (notes.filter(e => e.name === name).length > 0) {
      return true
    }
    return false
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newNote} onChange={handleNoteChange} />
        </div>
        <div>
          number: <input value={phoneNumber} onChange={handleNumberChange} />
        </div>
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
