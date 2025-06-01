# react_tic_tac_toe
- Implemented from https://react.dev/learn/tutorial-tic-tac-toe
- Extra features implemented :
- For the current move only, show “You are at move #…” instead of a button.
- Rewrite Board to use two loops to make the squares instead of hardcoding them.
- Add a toggle button that lets you sort the moves in either ascending or descending order.
- When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
- Display the location for each move in the format (row, col) in the move history list.
- Once moved to history to a specific move, do not show moves that were made after that.

- TODOs
- Stop additional moves once game is complete

- Learnings ( Pretty basics but its the first app :) ):
- set state in the same component where it is defined
- onClicks can be used to pass to child component so that they can update parent state variables
- style.css file is used for creating css for the components
- package.json defines and helps in downloading all the appropriate dependencies for the project
- operators and types ===, &&, !===, null
- Defining custom structures in state const [history, setHistory] = useState([{ board: Array(9).fill(null), note: "Game start" }]);
- Changing style class based on what's happening in the component return <button className={className}> className is passed as prop
- Loops can be used to append and eventually show components rows.push(<div className="board-row" key={row}> {squaresInRow} </div>); i.e JSX stuff
- Similar to python f strings structure const note = `Player ${player} clicked square ${squareNumber}`
- map method seems cool and useful [1, 2, 3, 4].map(num => num * 2); returns [2, 4, 6, 8]
- Inline lambdas definition `onClick={() => jumpTo(move)`
- Inline if/else's work same as C++ `const player = (currentMove % 2 === 0 ? "X" : "0")`
- const vs let
- function definition function jumpTo(move) {}
- default exports vs named exports `export default function Game() {}` whenever import x from './app.js' x will point to Game()
- 



  


https://github.com/user-attachments/assets/c699edc4-45ea-48a3-9f4e-7852a69c4c4f

