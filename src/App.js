import './App.css';
import { Routes, Route, } from "react-router-dom";
import Paywall from './components/paywall/Paywall';
import Snake from './components/snake/Snake';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Paywall />} />
        <Route path="/snake" element={<Snake />} />
      </Routes>
    </div>
  );
}

export default App;
