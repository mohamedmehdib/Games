'use client';

import React, { useEffect, useState } from 'react';

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const QuizGame: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(
        'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
      );
      const data = await res.json();
      const formattedQuestions = data.results.map((q: any) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }));
      setQuestions(formattedQuestions);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    setSelectedAnswer(answer);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setIsGameOver(true);
      }
    }, 10000);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameOver(false);
    setSelectedAnswer(null);
    setQuestions([]);
  };

  if (questions.length === 0) {
    return <div className="text-center pt-20 h-screen bg-black text-white text-xl">Loading questions...</div>;
  }

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center pt-20 h-screen bg-black text-white">
        <h1 className="text-3xl font-bold">Game Over!</h1>
        <p className="text-xl mt-4">Your score: {score} / {questions.length}</p>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={resetGame}
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="flex flex-col items-center bg-black text-white h-screen">
      <h1 className="text-3xl font-bold">Quiz Game</h1>
      <div className="mt-8 w-3/5 p-6 bg-black shadow-md rounded-lg text-center">
        <p className="text-lg font-medium">{currentQuestion.question}</p>
        <div className="mt-4 grid gap-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg w-1/2 mx-auto text-left duration-300 ${
                selectedAnswer === answer
                  ? answer === currentQuestion.correct_answer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={() => handleAnswer(answer)}
              disabled={!!selectedAnswer}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4">Score: {score}</p>
    </div>
  );
};

export default QuizGame;
