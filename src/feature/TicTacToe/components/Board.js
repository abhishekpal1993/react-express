import React from "react";

import Square from "./Square";

import {
  rowStyle,
  boardStyle,
  containerStyle,
  instructionsStyle,
  buttonStyle
} from "../utils/inline-styles";
import useBoard from "../hooks/useBoard";

const Board = props => {
  const [winner, board, player, selectSquare, resetBoard] = useBoard();

  const squares = board.map((row, rowIndex) => {
    return (
      <div className="board-row" key={`${rowIndex}`} style={rowStyle}>
        {row.map((square, squareIndex) => (
          <Square
            key={`${rowIndex}${squareIndex}`}
            player={square}
            onClick={() => selectSquare(rowIndex, squareIndex)}
          />
        ))}
      </div>
    );
  });

  return (
    <div style={containerStyle} className="gameBoard">
      {!winner ? (
        <div className="status" style={instructionsStyle}>
          Current player: {player}
        </div>
      ) : null}
      {winner ? (
        <div className="winner" style={instructionsStyle}>
          Winner: {winner}
        </div>
      ) : null}
      <button style={buttonStyle} onClick={resetBoard}>
        Reset
      </button>
      <div style={boardStyle}>{squares}</div>
    </div>
  );
};

export default Board;
