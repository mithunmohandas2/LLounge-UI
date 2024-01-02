import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard'
import Error404 from '../Pages/CommonPages/Error404'
import ManageUsers from '../Pages/Admin/UserManage'
import AddTutor from '../Pages/Admin/AddTutor'
import Profile from '../Pages/CommonPages/Profile'
import { tokenDecodeAPI } from '../services/interactionsAPI'
import { useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'
import AdminHeader from '../components/AdminComponents/AdminHeader/AdminHeader'
import CourseManage from '../Pages/Admin/CourseManage'
import CourseDetails from '../Pages/Admin/CourseDetails'

const AdminRoutes: React.FC = () => {
    const Navigate = useNavigate()
    const [Protected, setProtected] = useState(true);
    const dispatch = useDispatch()


    useEffect(() => {   //check for token and Block status for every component update
        if (!localStorage.getItem('token')) {
            return Navigate('/unauthorized')
        } else {
            (async () => {
                const role = localStorage.getItem('role')
                if (role !== 'admin') return Navigate('/unauthorized')
                const token = localStorage.getItem('token')
                const userData = await tokenDecodeAPI(token!)
                if (userData?.data?.isBlocked) {
                    setProtected(false);
                    dispatch(logout());
                    return Navigate('/unauthorized')
                }
            })()
        }
    })

    return (
        <>
            {Protected &&
                <Routes>
                    <Route path="" element={<Dashboard />} />
                    <Route path="/manageUsers" element={<ManageUsers />} />
                    <Route path="/courses" element={<CourseManage />} />
                    <Route path="/course" element={<CourseDetails />} />
                    <Route path="/addTutor" element={<AddTutor />} />
                    <Route path="/profile" element={<Profile header={<AdminHeader/>} />} />

                    <Route path="*" element={<Error404 />} />
                </Routes>
            }
        </>
    )
}

export default AdminRoutes