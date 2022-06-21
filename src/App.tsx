import { ThemeProvider } from 'styled-components';
import './App.css';
import { AppProvider } from './context/AppContext';
import AppRouter from './route/AppRouter';
import theme from './theme';

const App = () => {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
        <AppProvider>
          <AppRouter></AppRouter>
        </AppProvider>
      </ThemeProvider>
    </div>

  );
}

export default App;
