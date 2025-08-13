import { useState } from 'react'
import './App.css'
import { SignUpPage } from './pages/SignUpPage'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignInPage } from './pages/SignInPage';
import { CodeVerificationPage } from './pages/CodeVerificationPage';
import { HomePage } from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/verify" element={<CodeVerificationPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
