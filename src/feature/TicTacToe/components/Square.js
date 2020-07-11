import React from "react";

import {
  squareStyle,
  playerOneHightlightedStyle,
  playerTwoHightlightedStyle
} from "../utils/inline-styles";

const Square = React.memo(props => {
  const { player, onClick } = props;
  const addedStyle = !player
    ? null
    : player === 1
    ? playerOneHightlightedStyle
    : playerTwoHightlightedStyle;
  const style = {
    ...squareStyle,
    ...addedStyle
  };

  return (
    <div className="square" style={style} onClick={onClick}>
      {!player ? null : player === 1 ? "X" : "0"}
    </div>
  );
});

export default Square;
