export default function Person({name, phone}) {
  return (
    <li>{name} {phone && <span>- {phone}</span>}</li>
  )
}
