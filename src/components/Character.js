import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = (props) => {
  const [ loadedCharacter, setLoadedCharacter ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    setIsLoading(true);
    fetch('https://swapi.dev/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log('useeffect clean up function')
    };
  }, [props.selectedChar]);
  //this will run the useEffect to fetch the data everytime props.selectedChar changes as well as fetch the data for the first render
  
  useEffect(() => {
    return () => {
      console.log('component did unmount')
    };
  }, []);
  //for the clean up for things like event listeners and such you can run the return and annonymous function, you can also run an anon. function in a useeffect alone with no other code to run the clean up when the component unmounts

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

export default React.memo(Character);

//react.memo will store this component and will only rerender it when props change/ input changes
//replacemnt for should component update- but react detects which props change and should trigger an update now
