import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

let currentPlayer = PLAYER_1;

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());

  const [winner, setWinner] = useState('');
  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const markSquare = (clickedSquare) => {
    if (clickedSquare.value === '') {
      const updatedSquares = squares.map((row) => {
        row.map((square) => {
          if (square.id === clickedSquare.id) {
            square.value = currentPlayer;
          }
          return square;
        });
        return row;
      });
      setSquares(updatedSquares);
    }
  };

  const switchPlayers = () => {
    if (currentPlayer === PLAYER_1) {
      currentPlayer = PLAYER_2;
    } else {
      currentPlayer = PLAYER_1;
    }
  };

  const checkForWinner = () => {
    let i = 0;

    // Check all the rows and columns for a winner
    while (i < 3) {
      if (
        squares[i][0].value === squares[i][1].value &&
        squares[i][2].value === squares[i][1].value &&
        squares[i][0].value !== ''
      ) {
        return squares[i][0].value;
      } else if (
        squares[0][i].value === squares[1][i].value &&
        squares[2][i].value === squares[1][i].value &&
        squares[0][i].value !== ''
      ) {
        return squares[0][i].value;
      }
      i += 1;
    }
    // Check Top-Left to bottom-right diagonal
    if (
      squares[0][0].value === squares[1][1].value &&
      squares[2][2].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][0].value;
    }

    // Check Top-right to bottom-left diagonal
    if (
      squares[0][2].value === squares[1][1].value &&
      squares[2][0].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][2].value;
    }

    return null;
  };

  const checkForTie = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (squares[i][j].value === '') {
          return false;
        }
      }
    }
    return true;
  };

  const getGameStatus = () => {
    const winner = checkForWinner();
    if (winner) {
      return winner;
    } else {
      const isTie = checkForTie();
      if (isTie) {
        return 'tie';
      } else {
        return null;
      }
    }
  };

  const boardMessage = () => {
    if (winner) {
      return `Winner is ${winner}`;
    } else {
      return `Current Player ${currentPlayer}`;
    }
  };

  const updateBoard = (square) => {
    markSquare(square);

    const status = getGameStatus();
    if (status === PLAYER_1 || status === PLAYER_2) {
      setWinner(status);
      // end
    } else if (status === 'tie') {
      // end
    } else {
      switchPlayers();
    }
  };

  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{boardMessage()}</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={updateBoard} squares={squares} />
      </main>
    </div>
  );
};

export default App;
