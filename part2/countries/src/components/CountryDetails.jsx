import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_API_KEY; 

export default function CountryDetails({country}) {
  const [weather, setWeather] = useState(null);
  useEffect(()=> {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${country.capital[0]}&aqi=no`)
      .then(res => res.json())
      .then(data => setWeather(data.current))
  }, [country])

  return (
    <>
      <h1>{country.name.common}</h1>
      <section>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
      </section>
      <section>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([key, name]) => <li key={key}>{name}</li>)}
        </ul>
      </section>
      <section>
        <img src={country.flags.svg} alt={country.name.common + " flag"} />
      </section>
      {weather && <section>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature {weather.temp_c}º   celsius</p>
        <img src={weather.condition.icon} alt={weather.condition.text} />
      </section>}
    </>
  )
}
