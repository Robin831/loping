import './App.css';
import { AppProvider } from './context/AppContext';
import AppRouter from './route/AppRouter';

const App = () => {
  return (
    <div className="App">
      <AppProvider>
        <AppRouter></AppRouter>
      </AppProvider>
    </div>

  );
}

export default App;
