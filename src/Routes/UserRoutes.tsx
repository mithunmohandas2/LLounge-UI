import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../Pages/User/HomePage"
import LoginPage from "../Pages/CommonPages/LoginPage"
import RegisterPage from "../Pages/User/RegisterPage"
import OtpLoginPage from "../Pages/CommonPages/OtpLoginPage"
import Error404 from "../Pages/CommonPages/Error404"
import Error401 from "../Pages/CommonPages/Error401"
import Profile from "../Pages/CommonPages/Profile"
import UserCourses from "../Pages/User/UserCoursesPage"
import CourseDetails from "../Pages/CommonPages/CourseDetails"
import Notifications from "../Pages/CommonPages/Notifications"
import UserHeader from "../components/UserComponents/UserHeader"

const UserRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgotPassword" element={<OtpLoginPage />} />
                <Route path="/courses" element={<UserCourses />} />
                <Route path="/course" element={<CourseDetails admin={false} />} />
                <Route path="/profile" element={<Profile header={<UserHeader/>} />} />
                <Route path="/notifications" element={<Notifications header={<UserHeader/>} />} />
                
                <Route path="/admin/*" />
                <Route path="/tutor/*" />
                <Route path="/unauthorized"  element={<Error401 />}/>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default UserRoutes