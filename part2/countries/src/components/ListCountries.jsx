export default function ListCountries({countries, onSelectCountry}) {
  return (
    <ul>
      {countries.map(country => <li key={country.ccn3}>{country.name.common} <button onClick={()=>onSelectCountry(country.name.common)}>show</button></li>)}
    </ul>
  )
}
