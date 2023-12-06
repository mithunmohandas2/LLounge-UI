import React from "react"
import { Route, Routes } from "react-router-dom"
import TutorHomePage from "../Pages/Tutor/TutorHomePage"
import Error404 from "../Pages/CommonPages/Error404"

const TutorRoutes: React.FC = () => {
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