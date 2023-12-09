import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard'
import Error404 from '../Pages/CommonPages/Error404'
import ManageUsers from '../Pages/Admin/UserManage'
import AddTutor from '../Pages/Admin/AddTutor'

const AdminRoutes: React.FC = () => {
    const Navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate('/unauthorized')
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="/manageUsers" element={<ManageUsers />} />
                <Route path="/addTutor" element={<AddTutor />} />

                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default AdminRoutes