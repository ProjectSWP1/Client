import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/home.js'
import Register from './pages/register.js'
import Login from './pages/login.js'
import Admin from './components/Admin/Dashboard.js'
import ManageAccount from './components/Admin/ManageAccount/ManageAccount';
import Dash from './components/Admin/Dash';

function App() {
    return (
      <Router>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<Admin/>}>
               <Route path=':idClick' element={<Dash/>}/>   
            </Route>
         </Routes>
      </Router>
   );
}

export default App;
