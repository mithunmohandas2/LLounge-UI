import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/User/RegisterPage"
function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
