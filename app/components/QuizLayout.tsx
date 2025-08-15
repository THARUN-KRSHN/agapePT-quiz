import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, LinearProgress, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: string[];
  category: string;
  type: string;
}

interface QuizLayoutProps {
  name: string;
  age: number;
  onQuizComplete: (submissionId: number) => void;
}

const QuizLayout: React.FC<QuizLayoutProps> = ({ name, age, onQuizComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<{ questionId: number; response: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const questionVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/questions');
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data: Question[] = await res.json();
        setQuestions(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Failed to fetch questions:', err);
        setError(`Failed to load quiz: ${err.message}`);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId: number, response: string) => {
    setResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(r => r.questionId === questionId);
      if (existingResponseIndex > -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex] = { questionId, response };
        return updatedResponses;
      } else {
        return [...prevResponses, { questionId, response }];
      }
    });
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setSubmitting(true);
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, age, responses }),
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const result = await res.json();
        onQuizComplete(result.submissionId);
      } catch (err: any) {
        console.error('Failed to submit quiz:', err);
        setError(`Failed to submit quiz: ${err.message}`);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getCurrentResponse = (questionId: number) => {
    const found = responses.find(r => r.questionId === questionId);
    return found ? found.response : '';
  };

  const motivationalMessages = [
    "Your dedication to your child's growth is truly inspiring!",
    "Every thought you share helps us create better programs for children.",
    "Thank you for investing your time in this important survey.",
    "Your valuable input shapes the future of personality development for kids.",
    "Together, we can empower the next generation!",
  ];

  const funFactsOrTips = [
    "Did you know? Emotional intelligence in children can be a stronger predictor of future success than IQ.",
    "Tip: Encouraging creative play can significantly boost a child's problem-solving skills and imagination.",
    "Fact: Children who participate in extracurricular activities often develop better social skills and self-confidence.",
    "Tip: Reading to your child daily not only enhances their vocabulary but also strengthens your bond and emotional connection.",
    "Did you know? Positive affirmations can help build a child's self-esteem and resilience from a young age.",
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / (questions.length - 1)) * 100;

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading Quiz...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <Typography variant="h5" color="error">Error: {error}</Typography>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()} sx={{ mt: 3 }}>
          Retry
        </Button>
      </Container>
    );
  }

  if (!questions.length) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <Typography variant="h6">No questions available.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex} // Key ensures re-render and animation on index change
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

            {currentQuestion.type === 'influencing_factors' ? (
              <RadioGroup
                value={getCurrentResponse(currentQuestion.id)}
                onChange={(e) => handleOptionChange(currentQuestion.id, e.target.value)}
                sx={{ mt: 3 }}
              >
                {currentQuestion.options.map((option: string, optionIndex: number) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            ) : (
              <RadioGroup
                value={getCurrentResponse(currentQuestion.id)}
                onChange={(e) => handleOptionChange(currentQuestion.id, e.target.value)}
                sx={{ mt: 3 }}
              >
                {currentQuestion.options.map((option: string, optionIndex: number) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                variant="outlined"
                color="secondary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || submitting}
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
                disabled={submitting}
                sx={{
                  px: 4,
                  py: 1.2,
                }}
              >
                {currentQuestionIndex === questions.length - 1 ? (submitting ? <CircularProgress size={24} color="inherit" /> : 'Submit Quiz') : 'Next'}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4, fontStyle: 'italic' }}>
              {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
            </Typography>
            
            {/* Side engagement element */}
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
