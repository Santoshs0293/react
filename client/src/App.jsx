import React from 'react';
import Login from "./Login"
import Signup from "./Signup"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './Home'
import Logout from "./Logout";


function App() {

  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/Logout" element={<Logout />}></Route>
      </Routes>
    </Router>
    </div>
  )
}


export default App;
