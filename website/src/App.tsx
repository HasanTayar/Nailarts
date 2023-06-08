import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './pages/Navbar/Navbar';
import AppRoutes from './Router/AppRoutes';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
