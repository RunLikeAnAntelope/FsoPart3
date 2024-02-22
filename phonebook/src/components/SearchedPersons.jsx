import Persons from "./Persons"
const SearchedPersons = ({ persons, search, setNewPersons}) => {
  const lSearch = search.toLowerCase()
  return (
    <Persons
      persons={persons.filter(person =>
        person.name.toLowerCase().includes(lSearch))}
      setNewPersons={setNewPersons}
    />
  )
}
export default SearchedPersons