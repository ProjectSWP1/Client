import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/home.js'
import Register from './pages/register.js'

function App() {
    return (
      <Router>
         <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
         </Routes>
      </Router>
   );
}

export default App;
