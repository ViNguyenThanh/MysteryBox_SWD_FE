import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin/Admin'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Home from './pages/Home/Home'
import User from './pages/User/User'
import UserProfile from './components/User/UserProfile/UserProfile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/user" element={<User/>}/>
        <Route path="/user-profile" element = {<UserProfile/>}/>
      </Routes>
    </>
  )
}

export default App
