import personService from "../services/persons"
const Person = ({ person, setNewPersons, persons}) => {
  const onClick = () => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then( () =>
          setNewPersons(persons.filter(p => p.id != person.id)))
    }
  }
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onClick}>
        delete
      </button>
    </div>
  )
}
export default Person