import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Converter } from './containers/converter';
import { ErrorBoundary } from './error-boundary';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Converter />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
