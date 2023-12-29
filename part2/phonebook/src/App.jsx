import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=> {
    axios
      .get("http://localhost:3001/persons")
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const handleSubmit =(e)=> {
    e.preventDefault();

    if(newName.length > 0){
      // Check if new name is already on the list
      const found = persons.find((person) => person.name === newName);
      if (found){
        alert(`${newName} is already added to phonebook`)
        return;
      }

      // Add new name to phonebook and reset input
      setPersons([...persons, {name: newName, number}]);
      setNewName("");
      setNumber("")
    }
  }

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
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
        {personsFiltered.map(person => <Person key={person.name} name={person.name} phone={person.number} />)}
      </ul>
    </div>
  )
}

export default App