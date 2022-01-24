import React, { useState } from 'react';
import CharPicker from './components/CharPicker';
import Character from './components/Character';

const App = (props) => {

  const [selectedCharacter, setSelectedChar] = useState(1);
  const [side, setSide] = useState('light');
  const [destroyed, setDestroyed] = useState(false);

  const sideHandler = side => {
      setSide(side);
    };
    //use spread here to change just the side and not override entire state

  const charSelectHandler = event => {
      const charId = event.target.value;
      setSelectedChar(charId);
    };

  const destructionHandler = () => {
      setDestroyed(true);
    };

    let content = (
      <>
        <CharPicker
          side={side}
          selectedChar={selectedCharacter}
          onCharSelect={charSelectHandler}
        />
        <Character selectedChar={selectedCharacter} />
        <button onClick={sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
        {side === 'dark' && (
          <button onClick={destructionHandler}>DESTROY!</button>
        )}
      </>
     );

     if (destroyed) {
       content = <h1> DESTROYED!</h1>
     }
     return content;
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
