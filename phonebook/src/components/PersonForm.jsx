const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  return (
  <form onSubmit={onSubmit}>
    <div>
      name: <input name="pbname" value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input name="pbnumber" value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
export default PersonForm