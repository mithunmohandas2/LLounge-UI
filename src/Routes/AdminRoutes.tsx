import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard'
import Error404 from '../Pages/CommonPages/Error404'

const AdminRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default AdminRoutes