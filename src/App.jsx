// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import './App.css';
import FilmeLista from './components/pages/FilmesLista';
import Slasher from './components/pages/Slasher';
import Warren from './components/pages/Warren';
import Home from './components/homes/homes';

function App() {
  return (
    <Router>  
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<FilmeLista />} />
          <Route path="/Warren" element={<Warren />} />
          <Route path="/Slasher" element={<Slasher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
