import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Certificate from './components/Certificate';
import VerifyPage from './components/VerifyPage'; // Make sure this path is correct

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<Certificate />} />
          <Route path="/verify/:certId" element={<VerifyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

