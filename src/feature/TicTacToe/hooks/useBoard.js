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
    // winner if: any row/column/diagonals matched
    const calculateWinner = tempItemsToCalculate => {
      const playerOne = tempItemsToCalculate.every(item => item === 1);
      const playerTwo = tempItemsToCalculate.every(item => item === 2);

      return playerOne ? 1 : playerTwo ? 2 : 0;

    }

    const rowItems = currentBoard => {
      for (let row = 0; row < currentBoard.length; row += 1) {
        const tempItemsToCalculate = [];
        for (let column = 0; column < currentBoard.length; column += 1) {
          tempItemsToCalculate.push(currentBoard[row][column]);
        }

        const rowWinner = calculateWinner(tempItemsToCalculate);

        if (rowWinner) {
          return rowWinner;
        }
      }
    }

    const columnItems = currentBoard => {
      for (let column = 0; column < currentBoard.length; column += 1) {
        const tempItemsToCalculate = [];
        for (let row = 0; row < currentBoard.length; row += 1) {
          tempItemsToCalculate.push(currentBoard[row][column]);
        }

        const rowWinner = calculateWinner(tempItemsToCalculate);

        if (rowWinner) {
          return rowWinner;
        }
      }
    }

    const diagonalItemsTopLeft = currentBoard => {
      const tempItemsToCalculate = [];
      for (
        let row = 0, col = 0;
        row < currentBoard.length &&
        col < currentBoard.length;
        row++ , col++
      ) {
        tempItemsToCalculate.push(currentBoard[row][col]);
      }

      return calculateWinner(tempItemsToCalculate);
    }

    const diagonalItemsTopRight = currentBoard => {
      const tempItemsToCalculate = [];
      for (
        let row = 0, col = currentBoard.length - 1;
        row < currentBoard.length &&
        col >= 0;
        row++ , col--
      ) {
        tempItemsToCalculate.push(currentBoard[row][col]);
      }

      return calculateWinner(tempItemsToCalculate);
    }

    let winner = 0;
    const conditions = [
      rowItems,
      columnItems,
      diagonalItemsTopLeft,
      diagonalItemsTopRight,
    ];

    for (let i = 0; i < conditions.length && !winner; i += 1) {
      winner = conditions[i](board);
      console.log('ROUND CALLED', winner);
      if (winner) {
        console.log('SET CALLED', winner);
        setRoundWinner(winner);
        return;
      }
    }
  }, [board]);

  return [roundWinner, board, player, selectSquare, resetBoard];
};

export default useBoard;
