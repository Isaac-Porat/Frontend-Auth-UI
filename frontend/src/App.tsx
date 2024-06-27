import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/Auth';
import Hero from './components/Hero';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;