import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../Pages/User/HomePage"
import LoginPage from "../Pages/CommonPages/LoginPage"
import RegisterPage from "../Pages/User/RegisterPage"
import OtpLoginPage from "../Pages/CommonPages/OtpLoginPage"
import Error404 from "../Pages/CommonPages/Error404"
import Error401 from "../Pages/CommonPages/Error401"
import Profile from "../Pages/CommonPages/Profile"
import Header from "../components/CommonComponents/Header"

const UserRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgotPassword" element={<OtpLoginPage />} />
                <Route path="/profile" element={<Profile header={<Header/>} />} />
                
                <Route path="/admin/*" />
                <Route path="/tutor/*" />
                <Route path="/unauthorized"  element={<Error401 />}/>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default UserRoutes