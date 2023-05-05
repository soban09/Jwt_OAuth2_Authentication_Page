import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSelector } from 'react-redux';


const App = () => {

  const isSignedIn = useSelector(state => state.auth.isLoggedIn)
  const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  return (
    <GoogleOAuthProvider clientId={googleClientID}>
      <Routes>
        <Route path="/" element={isSignedIn ? <Home /> : <Navigate to="/auth" replace={true} />} />
        <Route path="/auth" element={isSignedIn ? <Navigate to="/" replace={true} /> : <Auth />} />
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App