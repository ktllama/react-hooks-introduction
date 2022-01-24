import React, { useState, useEffect } from 'react';
import './CharPicker.css';

const CharPicker = (props) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    console.log('use effect runs');
    setIsLoading(true);
      fetch('https://swapi.dev/api/people/?format=json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch.');
          }
          return response.json();
        })
        .then(charData => {
          const selectedCharacters = charData.results.slice(0, 5);
          setIsLoading(false);
          setCharacters(
            selectedCharacters.map((char, index) => ({
              name: char.name,
              id: index + 1
          })))
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
  }, []);

  //using empty array sets useeffect to only run on first page load- no array it will start an infinite loop

    let content = <p>loading...</p>;

    if (
      !isLoading &&
      characters &&
      characters.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {characters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!characters || characters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
}

export default CharPicker;
