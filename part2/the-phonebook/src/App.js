import React, { useState, useEffect } from "react";
import ApiServices from './services/Api';

const Note = ({ note }) => {

  return (
    <>
      <li className='note'>
        {note.name} {note.number}
      </li>
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


const Persons = ({ persons, filterText, deletePerson }) => {
  const filterPerson = () => {
    return persons.filter((e) => e.name.includes(filterText));
  };

  return (
    <ul>
      {filterPerson().map((note) => (
        <div key={note.id}>
          <Note  note={note} />
          <button
            onClick={() => deletePerson(note)}
            >
            delete
          </button>
        </div>
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

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={`notification notification--${message.type}`}>{message.text}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([])
  // const [notes, setNotes] = useState([{ name: "Arto Hellas", id: 1, phoneNumber: '09123456789' }]);
  const [filterText, setFilterText] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newNote, setNewNote] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    ApiServices
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        console.log('response.data:', response)
        setPersons(response)
      })

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
  }, [errorMessage])

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    setNewNote('')
    setPhoneNumber('')

    if (checkNotes(newNote)) {
      const currentPerson = persons.filter((person) => person.name === newNote);
      alert(newNote + 'is already added to phonebook')

      if (
        window.confirm(
          `${currentPerson[0].name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        ApiServices.update(currentPerson[0].id, {
          name: newNote,
          number: phoneNumber,
        }).then((returnedPerson) => {
          const newPersons = persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          );
          setPersons(newPersons);
          setErrorMessage({
            text: `Update ${returnedPerson.name}`,
            type: "success",
          });
        })
        .catch((err) => {
          setErrorMessage({
            text: `${newNote} was already removed from server`,
            type: "error",
          });
        });
      }
      return;
    }

    const newPerson = { name: newNote, number: phoneNumber, id: persons.length + 1 };
    const newPersonGroup = persons.concat(newPerson)
    setPersons(newPersonGroup)
    ApiServices.create(newPerson);
    setErrorMessage({ text: `Create ${newNote}`, type: "success" });
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

  const deletePerson = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      ApiServices.deletePerson(id).then((response) => {
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(newPersons);
        setErrorMessage({ text: `Delete ${name}`, type: "success" });
      })
      .catch((err) => {
        setErrorMessage({
          text: `${name} was already removed from server`,
          type: "error",
        });
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
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
      <Persons persons={persons} filterText={filterText} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
