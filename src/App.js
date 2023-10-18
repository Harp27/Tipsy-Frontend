// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header'
import Homepage from './components/Homepage';
import BarsPage from './components/BarsPage';
import AddBarForm from './components/AddBarForm'; 
import ShowPage from './components/ShowPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/bars" element={<BarsPage />} />
          <Route path="/bars/add" element={<AddBarForm />} />
          <Route path="/bars/show/:id" element={<ShowPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;