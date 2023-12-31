import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(()=> {
    personService
      .getAll()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])

  const showNotification=(notification)=> {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleSubmit =(e)=> {
    e.preventDefault();

    if(newName.length > 0){
      // Check if new name is already on the list
      const found = persons.find((person) => person.name === newName);
      if (found){
        // If name exists, ask to update number
        const updateNumber = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (updateNumber) {
          personService
            .updateNumber(found, number)
            .then((personUpdated) => {
              showNotification(`Updated ${personUpdated.name}'s number!`)
              setPersons(persons.map(x => x.id !== personUpdated.id ? x : personUpdated ));
              setNewName("");
              setNumber("")
            })
            return;
        } else {
          return;
        }
      }

      // Add new name to phonebook and reset input
      personService
        .create({name: newName, number})
        .then(personCreated => {
          showNotification(`Added ${newName}`)
          setPersons([...persons, personCreated]);
          setNewName("");
          setNumber("")
        })
        .catch(err => showNotification(err.response.data.error))
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(x => x.id === id);
    const shouldDelete = window.confirm(`Delete ${person.name}?`)
    if (!shouldDelete) return;

    personService
      .delete(id)
      .then(() => {
        showNotification(`Deleted ${person.name}`)
        setPersons(persons.filter(x => x.id !== id))
      })
  }

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type="notification" message={notification} />
      <Filter value={filter} onFilterChange={(e)=> setFilter(e.target.value)} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newPhone={number}
        onNameChange={(e)=>setNewName(e.target.value)}
        onPhoneChange={(e)=>setNumber(e.target.value)}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <ul>
        {personsFiltered.map(person => <Person key={person.id} name={person.name} phone={person.number} onDelete={()=> handleDelete(person.id)} />)}
      </ul>
    </div>
  )
}

export default App