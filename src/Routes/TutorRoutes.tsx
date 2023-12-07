import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import TutorHomePage from "../Pages/Tutor/TutorHomePage"
import Error404 from "../Pages/CommonPages/Error404"

const TutorRoutes: React.FC = () => {
    const Navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate('/unauthorized')
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path="" element={<TutorHomePage />} />
                
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default TutorRoutes