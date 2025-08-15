"use client";

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import NameAgeCollection from "./components/NameAgeCollection";
import QuizLayout from "./components/QuizLayout";
import ResultPage from "./components/ResultPage";
import { Box } from '@mui/material';

type AppState = "landing" | "nameAge" | "quiz" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<number>(0);
  const [submissionId, setSubmissionId] = useState<number | null>(null);

  const handleStartTest = () => {
    setAppState("nameAge");
  };

  const handleNameAgeSubmit = (name: string, age: number) => {
    setUserName(name);
    setUserAge(age);
    setAppState("quiz");
  };

  const handleQuizComplete = (id: number) => {
    setSubmissionId(id);
    setAppState("result");
  };

  const handleRetest = () => {
    setAppState("landing");
    setUserName('');
    setUserAge(0);
    setSubmissionId(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
      {appState === "landing" && <LandingPage onStartQuiz={handleStartTest} />}
      {appState === "nameAge" && <NameAgeCollection onStartQuiz={handleNameAgeSubmit} />}
      {appState === "quiz" && (
        <QuizLayout name={userName} age={userAge} onQuizComplete={handleQuizComplete} />
      )}
      {appState === "result" && submissionId && (
        <ResultPage submissionId={submissionId} onRetest={handleRetest} />
      )}
    </Box>
  );
}
