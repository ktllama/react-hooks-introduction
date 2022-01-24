import React from 'react';
import './CharPicker.css';
import { useHttp } from '../hooks/Http'

//when calling hooks you can only call on the top level function- not nested within another function
//so we cannot call our useHttp hook inside the useEffect hook like how the data was originally fetched
//but inside your own hook you create you can use other functions- so put useeffect in http hook to only render on load

const CharPicker = (props) => {

  const [isLoading, data] = useHttp('https://swapi.dev/api/people/?format=json', []);
  //passing url and dependencies [] as arguments to our useHttp hook
  //the hook is returning is loading and the data
  //use array desturcturing to assign these to variables

  const selectedCharacters = data ? data.results.slice(0, 5).map((char, index) => ({
    name: char.name,
    id: index + 1
  })) : [] ;
  //just selects the first 5 characters from the data
  //map through data to get desired info

    let content = <p>loading...</p>;

    if (
      !isLoading &&
      selectedCharacters &&
      selectedCharacters.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {selectedCharacters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!selectedCharacters || selectedCharacters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
}

export default CharPicker;
