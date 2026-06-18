import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Detail from './pages/Detail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
