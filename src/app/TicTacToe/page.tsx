'use client';

import React, { useState } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (board: string[]): string | null => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.every((cell) => cell !== '') ? 'Draw' : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex items-center justify-center text-3xl font-bold duration-300 rounded-lg border-2 border-gray-300 ${
              cell ? 'pointer-events-none' : 'bg-white cursor-pointer hover:bg-black'
            }`}
            onClick={() => handleClick(index)}
          >
            {cell === 'X' && <i className="uil uil-multiply text-red-500"></i>}
            {cell === 'O' && <i className="uil uil-circle text-blue-500"></i>}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-6 text-2xl font-semibold">
          {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
        </div>
      )}
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
