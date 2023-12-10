import React, { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import TutorHomePage from "../Pages/Tutor/TutorHomePage"
import Error404 from "../Pages/CommonPages/Error404"
import Profile from "../Pages/CommonPages/Profile"
import { tokenDecodeAPI } from "../Services/InteractionsAPI"
import { useDispatch } from "react-redux"
import { logout } from "../features/user/userSlice"
import TutorHeader from "../components/TutorComponents/TutorHeader"

const TutorRoutes: React.FC = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [Protected, setProtected] = useState(true)

    useEffect(() => {   //check for token and Block status for every component update
        if (!localStorage.getItem('token')) {
            return Navigate('/unauthorized')
        } else {
            (async () => {
                const role = localStorage.getItem('role')
                if (role !== 'tutor') return Navigate('/unauthorized')
                const token = localStorage.getItem('token')
                const userData = await tokenDecodeAPI(token!)
                // console.log('userDataFromToken', userData?.data?.isBlocked)
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
            <Routes>
                {Protected && <Route path="" element={<TutorHomePage />} />}
                {Protected && <Route path="/profile" element={<Profile header={<TutorHeader/>} />} />}

                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default TutorRoutes