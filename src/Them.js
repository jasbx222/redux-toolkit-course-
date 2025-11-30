import { createTheme } from '@mui/material/styles';

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // أزرق فاتح
    },
    secondary: {
      main: '#ff4081', // وردي فاتح
    },
    background: {
      default: '#f5f5f5', // خلفية فاتحة
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // أزرق فاتح على الداكن
    },
    secondary: {
      main: '#f48fb1', // وردي فاتح على الداكن
    },
    background: {
      default: '#121212', // خلفية داكنة
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
});
