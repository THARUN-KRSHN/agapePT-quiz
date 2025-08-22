import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, LinearProgress, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, QuizResponse, PersonalityResult } from '../types/quiz';
import { questions as defaultQuestions } from '../data/questions';
import { analyzeQuizResponses } from '../utils/quizAnalyzer';

interface QuizLayoutProps {
  name: string;
  age: number;
  onQuizComplete: (result: PersonalityResult) => void;
}

const QuizLayout: React.FC<QuizLayoutProps> = ({ name, age, onQuizComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);

  const questionVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  useEffect(() => {
    // Shuffle questions on component mount
    const shuffledQuestions = [...defaultQuestions]
      .sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleOptionChange = (questionId: number, selectedOptionIndex: number) => {
    setResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(r => r.questionId === questionId);
      if (existingResponseIndex > -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex] = { questionId, selectedOptionIndex };
        return updatedResponses;
      } else {
        return [...prevResponses, { questionId, selectedOptionIndex }];
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const result = analyzeQuizResponses(questions, responses);
      onQuizComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getCurrentResponse = (questionId: number) => {
    const found = responses.find(r => r.questionId === questionId);
    return found ? found.selectedOptionIndex : -1;
  };

  const motivationalMessages = [
    "Your journey of self-discovery is inspiring!",
    "Every answer brings you closer to understanding yourself better.",
    "Thank you for taking time for personal growth.",
    "Your insights are valuable for your development journey.",
    "Keep going - self-awareness is the key to growth!",
  ];

  const funFactsOrTips = [
    "Did you know? Personality traits can evolve throughout your life.",
    "Tip: Self-reflection is a powerful tool for personal growth.",
    "Fact: Understanding your personality can improve your relationships and decision-making.",
    "Tip: There are no 'right' or 'wrong' personality traits - each has its own strengths!",
    "Did you know? Regular self-assessment can help track your personal development journey.",
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / (questions.length - 1)) * 100;

  if (!questions.length) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <Typography variant="h6">Preparing your personality assessment...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={questionVariants}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Box
            sx={{
              p: 4,
              borderRadius: '12px',
              bgcolor: 'background.paper',
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" align="right" mb={2}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mb: 4, height: 8, borderRadius: 5 }} />

            <Typography variant="h5" gutterBottom>
              {currentQuestion.text}
            </Typography>

            <RadioGroup
              value={getCurrentResponse(currentQuestion.id)}
              onChange={(e) => handleOptionChange(currentQuestion.id, parseInt(e.target.value))}
              sx={{ mt: 3 }}
            >
              {currentQuestion.traitScores.map((option, optionIndex: number) => (
                <FormControlLabel
                  key={optionIndex}
                  value={optionIndex.toString()}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                variant="outlined"
                color="secondary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                sx={{
                  px: 4,
                  py: 1.2,
                }}
              >
                Previous
              </Button>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)' }}
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={getCurrentResponse(currentQuestion.id) === -1}
                sx={{
                  px: 4,
                  py: 1.2,
                }}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next'}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4, fontStyle: 'italic' }}>
              {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
            </Typography>
            
            <Box sx={{ mt: 4, p: 2, bgcolor: 'background.default', borderRadius: '8px', border: '1px dashed', borderColor: 'secondary.main' }}>
              <Typography variant="body2" color="text.primary" fontWeight="bold">Fun Fact / Tip:</Typography>
              <Typography variant="body2" color="text.secondary">
                {funFactsOrTips[Math.floor(Math.random() * funFactsOrTips.length)]}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default QuizLayout;
