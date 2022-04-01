import React, { useState } from "react";

const Note = ({ note }) => {
  return (
    <>
      <li>{note.name} {note.phoneNumber}</li>
    </>
  );
};

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ])
  // const [notes, setNotes] = useState([{ name: "Arto Hellas", id: 1, phoneNumber: '09123456789' }]);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newNote,
      id: persons.length + 1,
      phoneNumber: phoneNumber
    }

    if (checkNotes(newNote)) {
      alert(newNote + 'is already added to phonebook')
    } else {
      setPersons(persons.concat(noteObject))
      setNewNote('')
      setPhoneNumber('')
    }
    console.log('persons:', persons)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  const filterPerson = () => {
    return persons.filter(e => e.name.includes(filterText) )
  }

  const checkNotes = (name) => {
    if (persons.filter(e => e.name === name).length > 0) {
      return true
    }
    return false
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={filterText} onChange={handleFilterTextChange} />
      </div>
      <h1>add a new</h1>
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
        {filterPerson().map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
