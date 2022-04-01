import React, { useState, useEffect } from "react";
import axios from 'axios' 

const Note = ({ note }) => {
  return (
    <>
      <li>{note.name} {note.number}</li>
    </>
  );
};

const Filter = ({ filterText, handleFilterTextChange }) => {
  return (
    <>
      filter shown with{" "}
      <input value={filterText} onChange={handleFilterTextChange} />
    </>
  );
};


const Persons = ({ persons, filterText }) => {
  const filterPerson = () => {
    return persons.filter((e) => e.name.includes(filterText));
  };

  return (
    <ul>
      {filterPerson().map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  );
};

const PersonForm = ({addNote, newNote, phoneNumber, handleNoteChange, handleNumberChange}) => {
  return (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newNote} onChange={handleNoteChange} />
      </div>
      <div>
        number: <input value={phoneNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};


const App = () => {
  const [persons, setPersons] = useState([])
  // const [notes, setNotes] = useState([{ name: "Arto Hellas", id: 1, phoneNumber: '09123456789' }]);
  const [filterText, setFilterText] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        console.log('response.data:', response.data)
        setPersons(response.data)
      })
  }, [])

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const newPerson = { name: newNote, number: phoneNumber, id: persons.length + 1 };
    const newPersonGroup = persons.concat(newPerson)

    if (checkNotes(newNote)) {
      alert(newNote + 'is already added to phonebook')
    } else {
      setPersons(newPersonGroup)
      axios.post("http://localhost:3001/persons", newPerson);
      setNewNote('')
      setPhoneNumber('')
    }
    console.log('persons:', persons)
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
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
        <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
      </div>
      <h1>add a new</h1>
      <PersonForm
        addNote={addNote}
        newNote={newNote}
        phoneNumber={phoneNumber}
        handleNoteChange={handleNoteChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterText={filterText} />
    </div>
  );
};

export default App;
