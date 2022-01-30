import { useState } from "react";
import "./Game.css";

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const fillBoard = () => {
  const board = Array(9 * 2).fill(Array(9).fill(0));
  const filledBoard = board.map((row) =>
    row.map((cell) => (cell === 0 ? getRandomInt(1, 5) : cell))
  );
  return filledBoard;
};

const takeAdjacentGems = (board, rowIndex, cellIndex, takenGems = []) => {
  const gemType = board[rowIndex][cellIndex];
  let newlyTakenGems = 0;
  if (takenGems.length === 0) {
    takenGems = [[rowIndex, cellIndex]];
  }
  takenGems.forEach(([row, cell]) => {
    if (row > 9) {
      if (board[row - 1][cell] === gemType) {
        if (
          !takenGems.find(
            ([takenGemRow, takenGemCell]) =>
              takenGemRow === row - 1 && takenGemCell === cell
          )
        ) {
          newlyTakenGems++;
          takenGems.push([row - 1, cell]);
        }
      }
    }
    if (row < board.length - 1) {
      if (board[row + 1][cell] === gemType) {
        if (
          !takenGems.find(
            ([takenGemRow, takenGemCell]) =>
              takenGemRow === row + 1 && takenGemCell === cell
          )
        ) {
          newlyTakenGems++;
          takenGems.push([row + 1, cell]);
        }
      }
    }
    if (cell > 0) {
      if (board[row][cell - 1] === gemType) {
        if (
          !takenGems.find(
            ([takenGemRow, takenGemCell]) =>
              takenGemRow === row && takenGemCell === cell - 1
          )
        ) {
          newlyTakenGems++;
          takenGems.push([row, cell - 1]);
        }
      }
    }
    if (cell < board[row].length - 1) {
      if (board[row][cell + 1] === gemType) {
        if (
          !takenGems.find(
            ([takenGemRow, takenGemCell]) =>
              takenGemRow === row && takenGemCell === cell + 1
          )
        ) {
          newlyTakenGems++;
          takenGems.push([row, cell + 1]);
        }
      }
    }
  });
  if (newlyTakenGems === 0) {
    return takenGems;
  }
  return takeAdjacentGems(board, rowIndex, cellIndex, takenGems);
};

const Game = () => {
  const [board, setBoard] = useState(fillBoard());
  const [takenGems, setTakenGems] = useState([]);

  const takeGems = (rowIndex, cellIndex) => {
    setTakenGems(takeAdjacentGems(board, rowIndex, cellIndex));
    // const boardCopy = board.map((row, rowIndex) =>
    //   row.map((cell, cellIndex) => {
    //     if (
    //       takenGems.find(
    //         ([takenGemRow, takenGemCell]) =>
    //           takenGemRow === rowIndex && takenGemCell === cellIndex
    //       )
    //     ) {
    //       return 0;
    //     }
    //     return cell;
    //   })
    // );
    // setBoard(boardCopy);
  };

  return (
    <div className="visibleBoard">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className="cell" key={cellIndex}>
                <button
                  className={`
                  gem
                  gem-${cell}
                  ${
                    takenGems.find(
                      ([takenRow, takenCell]) =>
                        takenRow === rowIndex && takenCell === cellIndex
                    )
                      ? "taken"
                      : ""
                  }
                `}
                  onClick={() => {
                    takeGems(rowIndex, cellIndex);
                  }}
                ></button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
