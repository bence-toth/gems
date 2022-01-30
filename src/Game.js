import { useEffect, useState } from "react";
import "./Game.css";

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const fillBoard = (board) => {
  const filledBoard = board.map((row) =>
    row.map((cell) => (cell === 0 ? getRandomInt(1, 5) : cell))
  );
  return filledBoard;
};

const Game = () => {
  const [board, setBoard] = useState(Array(9 * 2).fill(Array(9).fill(0)));

  useEffect(() => {
    setBoard(fillBoard(board));
  }, [board]);

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div className="cell" key={cellIndex}>
              <button className={`gem-${cell}`}>{cell}</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;
