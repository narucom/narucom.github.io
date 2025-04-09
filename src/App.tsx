import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="content">
          <Routes>
            <Route path="/" element={<div>홈</div>} />
            <Route path="/about" element={<div>소개</div>} />
            <Route path="/contact" element={<div>연락처</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
