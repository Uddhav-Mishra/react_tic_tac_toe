import "./styles.css";
import { useState } from 'react';

// state is at component level, not global.
// state should be set at component level where its defined, pass function that updaes state to child if needed.

function Square({square, onClick, player, className}) {
  // disabled feature not in tutorial
  const disabled = (square === null ? false : true);
  return <button
   className={className} onClick={onClick} disabled={disabled}
   >{square}</button>;
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return null;
}

function Board({player, onPlay, squares}) {

  const calculateWinnerResult = calculateWinner(squares);
  if (calculateWinnerResult) {
      status = calculateWinnerResult[0] + " won";
  } else {
    status ="Next player = " + player;
  }

  function onSquareClick(squareNumber, player) {
    const nextSquares = squares.slice();
    nextSquares[squareNumber] = player;
    onPlay(nextSquares, squareNumber, player);
  };

  const rows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      squaresInRow.push(
        <Square
          key={index}
          className={(calculateWinnerResult !== null && calculateWinnerResult[1].includes(index)? "highlightSquare": "square")}
          square={squares[index]}
          onClick={() => onSquareClick(index, player)}
        />
      );
    }
    rows.push(
      <div className="board-row" key={row}>
        {squaresInRow}
      </div>
    );
  }

  return <>
    <div className="status">
      {status}
    </div>
    <div>
      {rows}
    </div>

  </>;
}

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const player = (currentMove % 2 === 0 ? "X" : "0");
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), note: "Game start" }
  ]);
  const [toggleHistory, setToggleHistory] = useState(false);

  function handlePlay(nextSquares, squareNumber, player) {
    const note = `Player ${player} clicked square ${squareNumber}`;
    const newEntry = { board: nextSquares, note };

    const nextHistory = [...history.slice(0, currentMove + 1), newEntry];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    // update history, not present in tutorial 
    setHistory(history.slice(0, move + 1));
    // set move number
    setCurrentMove(move);
  }

  let allMoves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move + ", " + history[move].note;
      } else {
        description = 'Go to game start';
      }

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
  });

  if (toggleHistory) {
    allMoves = allMoves.reverse();
  }

  const currentSquares = history[currentMove].board;

  return (

    <div className="game">
      <div className="game-board">
        <Board player={player} onPlay={handlePlay} squares={currentSquares}/>
        <div> You are at move number {currentMove} </div>
        <button className="toggleHistory" onClick={() => setToggleHistory(!toggleHistory)}> Toggle history </button>
      </div>
      <div className="game-info">
        <ol>{allMoves}</ol>
      </div>
    </div>
  );
}
