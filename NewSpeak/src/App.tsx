import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import useThemeStore from './store/ThemeStore';

function App() {
  const { theme } = useThemeStore();

  return (
    <div className={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
