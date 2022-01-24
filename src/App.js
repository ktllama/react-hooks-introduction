import React, { useState } from 'react';
import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = () => {

  const [state, setState] =useState({
    selectedCharacter: 1,
    side: 'light',
    destroyed: false
  })

  const sideHandler = side => {
      setState({ ...state, side: side });
    };
    //use spread here to change just the side and not override entire state

  const charSelectHandler = event => {
      const charId = event.target.value;
      //console.log(event.target.value);
      setState({ ...state, selectedCharacter: charId });
    };

  const destructionHandler = () => {
      setState({ ...state, destroyed: true });
    };

    return (
      <>
        <CharPicker
          side={state.side}
          selectedChar={state.selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={state.selectedCharacter} />
        <button onClick={sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {state.side === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </>
    );
};

export default App;

// class App extends Component {
//   state = {
//     selectedCharacter: 1,
//     side: 'light',
//     destroyed: false
//   };

//   sideHandler = side => {
//     this.setState({ side: side });
//   };

//   charSelectHandler = event => {
//     const charId = event.target.value;
//     this.setState({ selectedCharacter: charId });
//   };

//   destructionHandler = () => {
//     this.setState({ destroyed: true });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <CharPicker
//           side={this.state.side}
//           selectedChar={this.state.selectedCharacter}
//           onCharSelect={this.charSelectHandler}
//         />
//         <Character selectedChar={this.state.selectedCharacter} />
//         <button onClick={this.sideHandler.bind(this, 'light')}>
//           Light Side
//         </button>
//         <button onClick={this.sideHandler.bind(this, 'dark')}>Dark Side</button>
//         {this.state.side === 'dark' && (
//           <button onClick={this.destructionHandler}>DESTROY!</button>
//         )}
//       </React.Fragment>
//     );

//   }
// }

// export default App;
