'use client';

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import NameAgeCollection from './components/NameAgeCollection';
import QuizLayout from './components/QuizLayout';
import ResultPage from './components/ResultPage';
import { PersonalityResult } from './types/quiz';

type QuizStage = 'landing' | 'info' | 'quiz' | 'result';

export default function Home() {
  const [stage, setStage] = useState<QuizStage>('landing');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [result, setResult] = useState<PersonalityResult | null>(null);

  const handleStart = () => {
    setStage('info');
  };

  const handleInfoSubmit = (name: string, age: number) => {
    setName(name);
    setAge(age);
    setStage('quiz');
  };

  const handleQuizComplete = async (result: PersonalityResult) => {
    setResult(result);
    setStage('result');
    try {
      await fetch('/api/sendResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, result }),
      });
    } catch (error) {
      // Optionally handle error (e.g., show notification)
    }
  };

  const handleRetest = () => {
    setStage('landing');
    setResult(null);
    setName('');
    setAge(0);
  };

  return (
    <main>
      {stage === 'landing' && <LandingPage onStartQuiz={handleStart} />}
      {stage === 'info' && <NameAgeCollection onSubmit={handleInfoSubmit} />}
      {stage === 'quiz' && (
        <QuizLayout
          name={name}
          age={age}
          onQuizComplete={handleQuizComplete}
        />
      )}
      {stage === 'result' && result && (
        <ResultPage
          name={name}
          age={age}
          result={result}
          onRetest={handleRetest}
        />
      )}
    </main>
  );
}
