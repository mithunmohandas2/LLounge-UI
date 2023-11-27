import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/User/HomePage"
import LoginPage from "./Pages/CommonPages/LoginPage"
import RegisterPage from "./Pages/User/RegisterPage"
import OtpLoginPage from "./Pages/CommonPages/OtpLoginPage"

import TutorHomePage from "./Pages/Tutor/TutorHomePage"

import Dashboard from "./Pages/Admin/Dashboard"
function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<OtpLoginPage />} />

          {/* Tutor Routes */}
          <Route path="/tutor" element={<TutorHomePage />} />


          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
