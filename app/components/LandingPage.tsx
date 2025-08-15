import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: '12px',
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Typography variant="h1" gutterBottom>
            Welcome to Agape Quiz
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Exploring Parental Perception in Personality Development Programs for Kids
          </Typography>
          <Typography variant="body1" paragraph sx={{ mt: 3, mb: 4 }}>
            Dear parent,
            We're committed to supporting the growth and development of children, and we want to hear from you! This survey is designed to understand your values, priorities, and interests in providing your child with the best possible opportunities for success. Your feedback will be invaluable in helping us create programs that meet the needs of parents and children like yours. Please take a few minutes to share your thoughts with us.
          </Typography>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)' }}
            variant="contained"
            color="primary"
            size="large"
            onClick={onStartQuiz}
            sx={{
              mt: 4,
              px: 5,
              py: 1.5,
              // transition is handled by Framer Motion's whileHover
            }}
          >
            Start Test
          </Button>
          <Box sx={{ mt: 6, fontStyle: 'italic', color: 'text.secondary' }}>
            <Typography variant="body2">
              "Every child is a unique kind of flower, and all together, they make this world a beautiful garden." - Unknown
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LandingPage;
