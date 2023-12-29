export default function PersonForm({newName, newPhone, onNameChange, onPhoneChange, onSubmit}) {
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>number: <input type='tel' value={newPhone} onChange={onPhoneChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
