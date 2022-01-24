import React, { useEffect } from 'react';
import { useHttp } from '../hooks/Http';

import Summary from './Summary';

const Character = (props) => {
  const [isLoading, data] = useHttp('https://swapi.dev/api/people/' + props.selectedChar, [props.selectedChar])

  let loadedCharacter = null;

  if (data){
    loadedCharacter = {
      id: props.selectedChar,
      name: data.name,
      height: data.height,
      colors: {
        hair: data.hair_color,
        skin: data.skin_color
      },
      gender: data.gender,
      movieCount: data.films.length
    };
  };

  useEffect(() => {
    return () => {
      console.log('component did unmount')
    };
  }, []);
  //for the clean up for things like event listeners and such you can run the return and annonymous function, you can also run an anon. function in a useeffect alone with no other code to run the clean up when the component unmounts

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
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
    } else if (!isLoading && !loadedCharacter) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
}

export default React.memo(Character);

//react.memo will store this component and will only rerender it when props change/ input changes
//replacemnt for should component update- but react detects which props change and should trigger an update now
