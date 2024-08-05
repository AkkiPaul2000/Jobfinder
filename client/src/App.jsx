import { useState } from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Home'
import JobDetails from './JobDetails'
import AddJob from './AddJob'
import Login from './Login'
import Register from './Register'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/detail" element={<JobDetails/>}/>
          <Route path="/addJob" element={<AddJob/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
      </BrowserRouter>
  )
}

export default App
