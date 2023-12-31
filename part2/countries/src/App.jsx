import { useState, useEffect } from "react"
import ListCountries from "./components/ListCountries";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null); // needed for countries whose name is contained by another country

  useEffect(()=> {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => res.json())
      .then(data => setCountries(data))
  }, [])

  const countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  const handleSelectCountry = (countryName) => {
    const url = "https://studies.cs.helsinki.fi/restcountries/api/name/" + countryName;
    fetch(url)
      .then(res => res.json())
      .then(data => setSelectedCountry(data))
  }

  // Changing search input also removes selected country
  const handleSearchChange =(e)=>{
    setSearch(e.target.value);
    setSelectedCountry(null);
  }

  return (
    <>
      <input type="text" value={search} onChange={handleSearchChange} />
      {/* Too many countries */}
      {countriesFiltered.length > 10 && <p>Too many matches</p>}
      {/* 2 to 10 countries */}
      {((countriesFiltered.length > 1 && countriesFiltered.length <= 10)  && 
        <ListCountries 
          countries={countriesFiltered}
          onSelectCountry={handleSelectCountry}
        />
        )}
      {/* Only one country match or user selected a country */}
      {(countriesFiltered.length === 1 || selectedCountry) && <CountryDetails country={selectedCountry ? selectedCountry : countriesFiltered[0]} />}
      {/* No country found */}
      {countriesFiltered.length === 0 && <p>Could not find match</p>}
    </>
  )
}

export default App
