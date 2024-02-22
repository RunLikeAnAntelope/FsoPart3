import Person from "./Person"
const Persons = ({ persons, setNewPersons}) => {
  return (
    persons.map(person =>
      <Person
        key={person.name}
        person={person}
        setNewPersons={setNewPersons}
        persons={persons}
      />
    )
  )
}
export default Persons