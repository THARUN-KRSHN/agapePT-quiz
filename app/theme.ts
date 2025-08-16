import { createTheme } from '@mui/material/styles';

const vintagePalette = {
  primary: {
    main: '#6B4423', // Dark earthy brown
    light: '#8D6E63', // Lighter brown
    dark: '#4E342E',  // Darker brown
    contrastText: '#F5F5DC', // Creamy white
  },
  secondary: {
    main: '#A3A086', // Muted sage green
    light: '#C2C0B0', // Lighter sage
    dark: '#797762',  // Darker sage
    contrastText: '#F5F5DC',
  },
  error: {
    main: '#B00020',
  },
  warning: {
    main: '#FFD700',
  },
  info: {
    main: '#2196F3',
  },
  success: {
    main: '#4CAF50',
  },
  background: {
    default: '#F5F5DC', // Creamy white
    paper: '#E8E8D0',   // Light parchment
  },
  text: {
    primary: '#4E342E', // Dark brown
    secondary: '#797762', // Muted green-brown
  },
};

const theme = createTheme({
  palette: vintagePalette,
  typography: {
    fontFamily: 'Georgia, serif', // A classic, vintage-style serif font
    h1: {
      fontFamily: '"Times New Roman", serif',
      fontSize: '2.5rem',
      fontWeight: 700,
      color: vintagePalette.primary.dark,
    },
    h2: {
      fontFamily: '"Times New Roman", serif',
      fontSize: '2rem',
      fontWeight: 600,
      color: vintagePalette.primary.main,
    },
    body1: {
      fontFamily: 'Georgia, serif',
      fontSize: '1rem',
      color: vintagePalette.text.primary,
    },
    button: {
      fontFamily: 'Georgia, serif',
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '5px',
          },
        },
      },
    },
  },
});

export default theme;
