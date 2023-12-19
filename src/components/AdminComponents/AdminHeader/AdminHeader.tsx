import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/user/userSlice';

function AdminHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen) // open the menu in mobile view
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) Navigate('/login')
    }, [])

    const handleLogout = () => {
        const confirmed = window.confirm('Confirm Logout?')
        if (confirmed) {
            dispatch(logout());
            Navigate('/login');
        }
    }

    return (
        <header className="bg-slate-50 text-black sticky top-0 z-10">
            <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">
                <div className="flex cursor-pointer" onClick={() => Navigate("/admin")}>
                    <img style={{ width: 35 }} src="/images/LL-Logo.png" alt="Logo" />
                    <span className="text-3xl font-medium ms-2  text-cyan-600">Learner's Lounge</span>
                </div>
                <div>
                    {/* Hamburger icon for mobile */}
                    <button id="mobileOpenButton" className="text-3xl sm:hidden focus:outline-none  text-cyan-600" onClick={toggleMenu}>
                        &#9776;
                    </button>

                    {/* Nav for laptops */}
                    <nav className="hidden sm:block space-x-12 text-xl mx-5" aria-label="main">
                        <span onClick={() => Navigate("/admin/notifications")} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">🔔 Alerts</span>
                        <span onClick={() => Navigate("/admin/courses")} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">📖 Courses</span>
                        <span onClick={() => Navigate("/admin/manageUsers")} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">👥 Users</span>
                        <span onClick={() => Navigate("/admin/profile")} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">👦🏻 Profile</span>
                    </nav>

                </div>

                <div className='hidden sm:block '>
                    <p><span className='lineEffect cursor-pointer' onClick={handleLogout}>Logout</span></p>
                </div>

            </section>

            <section>
                {isMenuOpen && <div>
                    {/* expanded Nav for mobile */}
                    <nav aria-label="mobile" className=''>
                        <ul className='py-3'>
                            <li className='py-3 text-center' >
                                <span onClick={() => { Navigate("/admin/notifications"); toggleMenu() }} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">🔔 Notifications</span>
                            </li>
                            <li className='py-3 text-center'>
                                <span onClick={() => { Navigate("/admin/courses"); toggleMenu() }} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">📖 Courses</span>
                            </li>
                            <li className='py-3 text-center' >
                                <span onClick={() => { Navigate("/admin/manageUsers"); toggleMenu() }} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">👥 Users</span>
                            </li>
                            <li className='py-3 text-center'>
                                <span onClick={() => { Navigate("/admin/profile"); toggleMenu() }} className="text-cyan-700 hover:opacity-70 lineEffect cursor-pointer">👦🏻 Profile</span>
                            </li>
                            <li className='py-3 text-center'>
                                <p><span className='lineEffect cursor-pointer' onClick={handleLogout}>Logout</span></p>
                            </li>
                        </ul>
                    </nav>
                </div>}
            </section>
        </header>
    )
}

export default AdminHeader