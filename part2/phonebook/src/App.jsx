import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

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
      setPersons([...persons, {name: newName, phone: newPhone}]);
      setNewName("");
      setNewPhone("")
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
        newPhone={newPhone}
        onNameChange={(e)=>setNewName(e.target.value)}
        onPhoneChange={(e)=>setNewPhone(e.target.value)}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <ul>
        {personsFiltered.map(person => <Person key={person.name} name={person.name} phone={person.phone} />)}
      </ul>
    </div>
  )
}

export default App