export default function Person({name, phone, onDelete}) {
  return (
      <li>{name} {phone && <span>- {phone}</span>} <button onClick={onDelete}>delete</button>  </li>
  )
}
