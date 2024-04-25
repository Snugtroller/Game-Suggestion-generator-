import logo from './logo.svg';
import { Routes,Route,useLocation } from 'react-router-dom';
import './App.css';
import React from 'react';
import Form from './components/form';
import Particles from './components/particle';

function App() {
  return (
    <div className="App">
      
        <Particles id="particles"/>
        <Form/>
    </div>
  );
}

export default App;
