import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { PersonalityResult } from '../types/quiz';
import { getTraitName, getTraitDescription } from '../utils/quizAnalyzer';

interface ResultPageProps {
  name: string;
  age: number;
  result: PersonalityResult;
  onRetest: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ name, age, result, onRetest }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
          <Typography variant="h4" gutterBottom color="primary">
            Personality Development Profile
          </Typography>
          
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {name}, Age: {age}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 3, mb: 4, fontStyle: 'italic', color: 'primary.dark' }}>
            Thank you for completing the personality assessment. Here's an insight into your personality traits and areas for potential growth.
          </Typography>

          <Box sx={{ my: 4, textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Dominant Trait: {getTraitName(result.dominantTrait)}
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
              {getTraitDescription(result.dominantTrait)}
            </Typography>
          </Box>

          <Box sx={{ my: 4, textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Your Personality Profile:
            </Typography>
            {Object.entries(result.traits).map(([traitId, score]) => (
              <Box key={traitId} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                  {getTraitName(traitId)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      flex: 1,
                      height: 10,
                      bgcolor: 'background.default',
                      borderRadius: 5,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${score}%`,
                        height: '100%',
                        bgcolor: 'primary.main',
                        borderRadius: 5,
                        transition: 'width 1s ease-in-out',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ minWidth: 40 }}>
                    {score}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ my: 4, textAlign: 'left', bgcolor: 'background.default', p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              Suggested Development Areas:
            </Typography>
            <ul style={{ paddingLeft: '20px' }}>
              {result.suggestions.map((suggestion, index) => (
                <li key={index}>
                  <Typography variant="body1" paragraph>
                    {suggestion}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              variant="contained"
              color="primary"
              onClick={onRetest}
              sx={{
                px: 4,
                py: 1.2,
              }}
            >
              Take Quiz Again
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              variant="outlined"
              color="secondary"
              sx={{ px: 4, py: 1.2 }}
              onClick={() => window.print()}
            >
              Download PDF
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              variant="outlined"
              color="secondary"
              sx={{ px: 4, py: 1.2 }}
              onClick={() => {
                const mailto = `mailto:host@example.com?subject=Personality Quiz Result for ${name}&body=Name: ${name}%0AAge: ${age}%0AResult: ${JSON.stringify(result, null, 2)}`;
                window.location.href = mailto;
              }}
            >
              Share via Email
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4, fontStyle: 'italic' }}>
            Remember: This assessment is a snapshot of your current traits and tendencies.
            Personal growth is a journey, and these insights can help guide your development path.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ResultPage;
