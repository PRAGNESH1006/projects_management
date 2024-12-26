import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Head, Link } from '@inertiajs/react';
import { useState, useCallback, useEffect } from 'react';

export default function Welcome({ auth }) {
    const [board, setBoard] = useState(Array(9).fill(null)); // Tic Tac Toe board
    const [isXNext, setIsXNext] = useState(true); // Track which player's turn it is
    const [isXStart, setIsXStart] = useState(true); // Track if the user (X) starts
    const [xScore, setXScore] = useState(0); // Track X score
    const [oScore, setOScore] = useState(0); // Track O score
    const [xWins, setXWins] = useState(0); // Track X wins
    const [oWins, setOWins] = useState(0); // Track O wins

    // Rock Paper Scissors (for the computer)
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [gameResult, setGameResult] = useState(null);
    const [userScore, setUserScore] = useState(0);
    const [userWins, setUserWins] = useState(0); // Track user wins
    const [computerScore, setComputerScore] = useState(0);
    const [computerWins, setComputerWins] = useState(0); // Track computer wins
    const choices = ['rock', 'paper', 'scissors'];

    // Handle Tic Tac Toe (User vs Computer)
    const handleClick = useCallback((index) => {
        if (board[index] || calculateWinner(board) || !isXNext) return; // Prevent clicks when game over or it's computer's turn

        const newBoard = board.slice();
        newBoard[index] = 'X'; // User plays as X
        setBoard(newBoard);
        setIsXNext(false); // Switch to computer's turn
    }, [board, isXNext]);

    const computerMove = useCallback(() => {
        if (isXNext) return; // Prevent move if it's user's turn

        // Computer makes a move using Minimax
        const bestMove = getBestMove(board);
        const newBoard = board.slice();
        newBoard[bestMove] = 'O'; // Computer plays as O
        setBoard(newBoard);
        setIsXNext(true); // Switch to user's turn
    }, [board, isXNext]);

    useEffect(() => {
        if (!isXNext) {
            computerMove(); // Make computer move after user's turn
        }
    }, [isXNext, computerMove]);

    // Minimax algorithm to determine the best move for the computer
    const minimax = (board, depth, isMaximizing) => {
        const winner = calculateWinner(board);
        if (winner === 'X') return -1; // User wins
        if (winner === 'O') return 1;  // Computer wins
        if (board.every((square) => square !== null)) return 0; // Draw

        let bestScore = isMaximizing ? -Infinity : Infinity;
        const availableSquares = board
            .map((value, index) => value === null ? index : null)
            .filter(index => index !== null);

        for (let i = 0; i < availableSquares.length; i++) {
            const newBoard = board.slice();
            newBoard[availableSquares[i]] = isMaximizing ? 'O' : 'X';
            const score = minimax(newBoard, depth + 1, !isMaximizing);
            bestScore = isMaximizing
                ? Math.max(bestScore, score)
                : Math.min(bestScore, score);
        }
        return bestScore;
    };

    const getBestMove = (board) => {
        let bestMove = -1;
        let bestScore = -Infinity;

        const availableSquares = board
            .map((value, index) => value === null ? index : null)
            .filter(index => index !== null);

        for (let i = 0; i < availableSquares.length; i++) {
            const newBoard = board.slice();
            newBoard[availableSquares[i]] = 'O'; // Try computer's move
            const score = minimax(newBoard, 0, false);
            if (score > bestScore) {
                bestScore = score;
                bestMove = availableSquares[i];
            }
        }
        return bestMove;
    };

    // Calculate Tic Tac Toe Winner
    const calculateWinner = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const status = winner
        ? `Winner: ${winner}`
        : board.every((square) => square !== null)
        ? 'Draw'
        : `Next player: ${isXNext ? 'You (X)' : 'Computer (O)'}`;

    // Update score and wins for Tic Tac Toe
    useEffect(() => {
        if (winner === 'X') {
            setXScore((prev) => prev + 1);
            setXWins((prev) => prev + 1); // Increment X Wins
        } else if (winner === 'O') {
            setOScore((prev) => prev + 1);
            setOWins((prev) => prev + 1); // Increment O Wins
        }
    }, [winner]);

    const resetTicTacToe = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(isXStart); // Reset to initial turn
    };

    // Simulate Rock Paper Scissors (user vs computer)
    const handleRockPaperScissors = (choice) => {
        setUserChoice(choice);

        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice);

        const result = determineWinner(choice, randomChoice);
        setGameResult(result);

        if (result === 'win') {
            setUserScore((prev) => prev + 1);
            setUserWins((prev) => prev + 1); // Increment user wins
        } else if (result === 'lose') {
            setComputerScore((prev) => prev + 1);
            setComputerWins((prev) => prev + 1); // Increment computer wins
        }
    };

    // Determine winner for Rock Paper Scissors (user vs computer)
    const determineWinner = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) return 'draw';
        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    };

    // Check if either player has won 5 times to display profile
    const hasWonFiveTimes = xWins >= 5 || oWins >= 5 || computerWins >= 5;

    const user = auth.user;

    return (
        <>
            <Head title="Welcome" />

            {/* Conditional Navbar Display */}
            {hasWonFiveTimes ? (
                <header className="py-2 bg-slate-500">
                    <nav className="flex justify-end items-center space-x-4 px-6">
                        {auth?.user ? (
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out focus:outline-none"
                                        >
                                            {auth.user.name}
                                            <svg
                                                className="ml-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link
                                    href={route('login')}
                                    className="px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus:ring-[#FF2D20] dark:text-white dark:hover:text-white/80"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus:ring-[#FF2D20] dark:text-white dark:hover:text-white/80"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </header>
            ) : (
                <nav className="flex justify-center items-center space-x-4 px-6">
                    <p className="text-white text-lg">
                        Play both games and win 5 times to see the Navbar and access your profile.
                    </p>
                </nav>
            )}

            {/* The games section will always be displayed */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
                {/* Tic Tac Toe */}
                <div className="w-full max-w-lg text-center">
                    <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">Tic Tac Toe</h1>

                    <div className="text-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Scores</h2>
                        <p className="text-xl">X: <span className="font-bold">{xScore}</span> - O: <span className="font-bold">{oScore}</span></p>
                        <p className="text-xl">Wins: X - {xWins} | O - {oWins}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {board.map((square, index) => (
                            <button
                                key={index}
                                className="w-24 h-24 text-4xl font-bold rounded-lg border border-gray-300 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                onClick={() => handleClick(index)}
                            >
                                {square}
                            </button>
                        ))}
                    </div>

                    <div className="mb-4">
                        <p className="text-lg font-semibold">{status}</p>
                    </div>

                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        onClick={resetTicTacToe}
                    >
                        Start New Game
                    </button>
                </div>

                {/* Rock Paper Scissors */}
                <div className="mt-12 w-full max-w-lg text-center">
                    <h1 className="text-4xl font-bold mb-6 text-green-600 dark:text-green-400">Rock Paper Scissors</h1>

                    <div className="text-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Scores</h2>
                        <p className="text-xl">User: <span className="font-bold">{userScore}</span> - Computer: <span className="font-bold">{computerScore}</span></p>
                        <p className="text-xl">Wins: User - {userWins} | Computer - {computerWins}</p>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-center space-x-4">
                            {choices.map((choice) => (
                                <button
                                    key={choice}
                                    className="bg-blue-500 text-white py-2 px-6 rounded-md"
                                    onClick={() => handleRockPaperScissors(choice)}
                                >
                                    {choice.charAt(0).toUpperCase() + choice.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {gameResult && (
                        <div className="mb-4">
                            <p className="text-lg font-semibold">Result: {gameResult}</p>
                            <p className="text-lg">You chose {userChoice}, Computer chose {computerChoice}.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
