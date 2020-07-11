import { useState, useCallback, useEffect } from "react";

const initialBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const useBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState(1);
  const [roundWinner, setRoundWinner] = useState(null);

  const resetBoard = useCallback(() => {
    setBoard(initialBoard);
    setPlayer(1);
    setRoundWinner(null);
  }, []);

  const selectSquare = useCallback(
    (row, column) => {
      if (board[row][column] === 0 && !roundWinner) {
        setBoard(prev => {
          const newBoard = prev.map(row => row.map(square => square));
          newBoard[row][column] = player;
          return newBoard;
        });
        setPlayer(prev => {
          if (prev > 1) {
            return 1;
          } else {
            return 2;
          }
        });
      }
    },
    [player, board, roundWinner]
  );

  useEffect(() => {
    // winnerCondition :
    // - rows have same value
    // - columns have same value
    // - diagonals have same value
    const computeValues = tempCompare => {
      const playerOne = tempCompare.every(item => item === 1);
      const playerTwo = tempCompare.every(item => item === 2);

      return playerOne ? 1 : playerTwo ? 2 : 0;
    };

    const diagonalExtract = box => {
      let tempCompare = [];
      let winner = 0;

      for (
        let row = 0, col = 0;
        row < box.length && col < box.length;
        row++, col++
      ) {
        tempCompare.push(box[row][col]);
      }

      winner = computeValues(tempCompare);
      if (winner) {
        return winner;
      } else {
        tempCompare = [];
      }

      for (
        let row = 0, col = box.length - 1;
        row < box.length && col >= 0;
        row++, col--
      ) {
        tempCompare.push(box[row][col]);
      }

      return computeValues(tempCompare);
    };

    const rowExtract = box => {
      for (let row = 0; row < box.length; row += 1) {
        const tempCompare = [];
        let winner = 0;
        for (let col = 0; col < box.length; col += 1) {
          tempCompare.push(box[row][col]);
        }

        winner = computeValues(tempCompare);
        if (winner) {
          return winner;
        }
      }
    };

    const columnExtract = box => {
      for (let col = 0; col < box.length; col += 1) {
        const tempCompare = [];
        let winner = 0;
        for (let row = 0; row < box.length; row += 1) {
          tempCompare.push(box[row][col]);
        }

        winner = computeValues(tempCompare);
        if (winner) {
          return winner;
        }
      }
    };

    const winnerCondition = [diagonalExtract, rowExtract, columnExtract];
    let winner = 0;

    for (let i = 0; i < winnerCondition.length && !winner; i += 1) {
      winner = winnerCondition[i](board);
    }

    if (winner) {
      setRoundWinner(winner);
    }
  }, [board]);

  return [roundWinner, board, player, selectSquare, resetBoard];
};

export default useBoard;
