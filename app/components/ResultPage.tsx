import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface ResultPageProps {
  submissionId: number;
  onRetest: () => void;
}

interface SubmissionData {
  name: string;
  age: number;
  scores: string;
  dominantType: string;
  calculationLog: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ submissionId, onRetest }) => {
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/submission?submissionId=${submissionId}`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data: SubmissionData = await res.json();
        setSubmissionData(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Failed to fetch submission data:', err);
        setError(`Failed to load results: ${err.message}`);
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [submissionId]);

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      const res = await fetch(`/api/pdf?submissionId=${submissionId}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `personality_test_results_${submissionData?.name || 'result'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Failed to download PDF:', err);
      alert(`Failed to download PDF: ${err.message}`);
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading Results...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <Typography variant="h5" color="error">Error: {error}</Typography>
        <Button variant="contained" color="primary" onClick={onRetest} sx={{ mt: 3 }}>
          Retest
        </Button>
      </Container>
    );
  }

  if (!submissionData) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <Typography variant="h6">No results found for this submission.</Typography>
        <Button variant="contained" color="primary" onClick={onRetest} sx={{ mt: 3 }}>
          Retest
        </Button>
      </Container>
    );
  }

  const scoresObj = JSON.parse(submissionData.scores);

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
            Quiz Results for {submissionData.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Age: {submissionData.age}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mt: 3, mb: 4, fontStyle: 'italic', color: 'primary.dark' }}>
            Congratulations on completing the survey! Your insights are invaluable for understanding and improving personality development programs for children.
          </Typography>
          <Box sx={{ my: 4, textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom sx={{ textDecoration: 'underline' }}>
              Your Parental Perception Insight:
            </Typography>
            <Typography variant="body1" paragraph>
              {submissionData.dominantType}
            </Typography>
          </Box>

          <Box sx={{ my: 4, textAlign: 'left' }}>
            <Typography variant="h5" gutterBottom sx={{ textDecoration: 'underline' }}>
              Detailed Scores:
            </Typography>
            {Object.entries(scoresObj).map(([key, value]) => (
              <Typography key={key} variant="body2">
                {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}: {value}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              variant="contained"
              color="primary"
              size="large"
              onClick={onRetest}
              sx={{
                px: 4,
                py: 1.2,
              }}
            >
              Retest
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05, boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)' }}
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              sx={{
                px: 4,
                py: 1.2,
              }}
            >
              {pdfLoading ? <CircularProgress size={24} color="inherit" /> : 'Download PDF'}
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ResultPage;
