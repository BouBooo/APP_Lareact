import React from 'react';
import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './components/AppRouter';


function App() {
  return (
    <>
      <Router>
        <AppRouter/>
      </Router>
    </>
  )
}

export default App;
