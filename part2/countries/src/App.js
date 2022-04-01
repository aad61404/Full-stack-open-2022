import React, { useState, useEffect } from "react";
import axios from "axios";

const Line = ({ name, flag }) => {
  const [showFlag, setShowFlag] = useState(false)

  const handleShowFlag = () => {
    setShowFlag(!showFlag)
  }

  return (
    <tr>
      <td>{name}</td>
      <button onClick={handleShowFlag}>show</button>
      {
        showFlag && <FlagImage flag={flag} />
      }
    </tr>
  );
};



const FlagImage = ({ flag }) => {
    return <img src={flag} alt="flag" width="100px" />
}

const Filter = ({ data, txt }) => {
  // console.log('apiData:', apiData)
  if (data) {
    var result = data.filter(
      (item) => item.name.toLowerCase().search(txt.toLowerCase()) !== -1
    );

    if (result.length === 1) {
      const showData = result[0];
      return (
        <>
          <h1>{showData.name}</h1>
          <p>capital {showData.capital}</p>
          <p>population {showData.population}</p>
          <ul>
            {showData.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={showData.flag} alt={showData.name} width="100px" />
        </>
      );
    }

    if (result.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (result.length > 1 && result.length < 10) {
      return (
        <>
          <table>
            <tbody>
              {result.map((item) => (
                <Line key={item.name} name={item.name} flag={item.flag} />
              ))}
            </tbody>
          </table>
        </>
      );
    }
  }
};

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  const handleSearchCountry = (event) => {
    return setSearchCountry(event.target.value);
  };

  useEffect(() => {
    console.log("effect");
    axios.get(`https://restcountries.com/v2/all`).then((response) => {
      console.log("type response.data :", typeof response.data);
      setApiData(response.data);
    });
  }, []);

  return (
    <>
      <div>
        find countries <input type="text" onChange={handleSearchCountry} />
      </div>
      <Filter data={apiData} txt={searchCountry} />
    </>
  );
}

export default App;
