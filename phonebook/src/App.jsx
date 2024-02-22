import { useEffect, useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import SearchedPersons from './components/SearchedPersons'
import personService from './services/persons'

const SuccessMessage = ({ message }) => {
  const style = {
    color: "green",
    backround: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10

  }
  if (message !== undefined) {
    return (
      <h2 style={style}>
        {message}
      </h2>
    )
  } else {
    return undefined
  }

}

const ErrorMessage = ({ message }) => {
  const style = {
    color: "red",
    backround: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10

  }
  if (message !== undefined) {
    return (
      <h2 style={style}>
        {message}
      </h2>
    )
  } else {
    return undefined
  }

}

const App = () => {

  // state variables
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [successMessage, setSuccessMessage] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  useEffect(
    //first argument
    () => {
      personService
        .getAll()
        .then(response => {
          setPersons(response)
        })
    },
    //second argument. Tells use effect to only run on first render
    []
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const setSetPersons = (newPersons) => {
    setPersons(newPersons)
  }

  const editNumber = () => {
    const confirm = window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)
    if (confirm) {
      const person = persons.find(n => n.name === newName)
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(p => p.id === response.id ? response : p))
          setSuccessMessage(
            `Updated ${response.name}`
          )
          setTimeout(() => {
            setSuccessMessage(undefined)
          }, 5000)
        })
        .catch( () => {
          setPersons(persons.filter(n => n.id !== person.id))
          setErrorMessage(
            `Information of ${person.name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(undefined)
          }, 5000)
        })

    }
  }

  const addEntry = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      editNumber()
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setSuccessMessage(
            `Added ${response.name}`
          )
          setTimeout(() => {
            setSuccessMessage(undefined)
          }, 5000)
        })
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter search={search} onChange={handleSearchChange} />
      <PersonForm
        onSubmit={addEntry}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <SearchedPersons persons={persons} search={search} setNewPersons={setSetPersons} />
    </div>
  )
}

export default App