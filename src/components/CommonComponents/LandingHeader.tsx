import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen) // open the menu in mobile view
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) setIsLoggedIn(true)
    }, [])

    const handleLogout = () => {
        const confirmed = window.confirm('Confirm Logout?')
        if (confirmed) {
            dispatch(logout());
            Navigate('/login')
        }
    }

    return (
        <header className="bg-slate-50 text-black sticky top-0 z-10">
            <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">
                <a href="#home">
                    <div className="flex">
                        <img style={{ width: 35 }} src="/images/LL-Logo.png" alt="Logo" />
                        <span className="text-3xl font-medium ms-2  text-cyan-600">Learner's Lounge</span>
                    </div>
                </a>
                <div>
                    {/* Hamburger icon for mobile */}
                    <button id="mobileOpenButton" className="text-3xl sm:hidden focus:outline-none  text-cyan-600" onClick={toggleMenu}>
                        &#9776;
                    </button>

                    {/* expanded Nav for web */}
                    <nav className="hidden sm:block space-x-12 text-xl" aria-label="main">
                        <a href="#about" className="hover:opacity-70 lineEffect">About</a>
                        {isLoggedIn ?
                            <span onClick={() => Navigate('/courses')} className="hover:opacity-70 lineEffect cursor-pointer">Courses</span>
                            : <a href="#courses" className="hover:opacity-70 lineEffect">Courses</a>}
                        <a href="#contact" className="hover:opacity-70 lineEffect">Contact</a>
                    </nav>

                </div>

                {!isLoggedIn && <div className='hidden sm:block '>
                    <p><span className='lineEffect cursor-pointer' onClick={() => Navigate('/login')}>Login</span> | <span className='lineEffect cursor-pointer' onClick={() => Navigate('/register')}>Register</span></p>
                </div>}
                {isLoggedIn && <div className='hidden sm:block '>
                    <p><span className='lineEffect cursor-pointer' onClick={handleLogout}>Logout</span></p>
                </div>}

            </section>

            <section>
                {isMenuOpen && <div>
                    {/* expanded Nav for web */}
                    <nav aria-label="mobile" className=''>
                        <ul className='py-3'>
                            <li className='py-3 text-center' >
                                <a href="#about" className="hover:opacity-70 lineEffect" onClick={toggleMenu}>About</a>
                            </li>
                            {isLoggedIn ? <li className='py-3 text-center'>
                                <span onClick={() => Navigate('/courses')} className="hover:opacity-70 lineEffect cursor-pointer">Courses</span>
                            </li> : <li className='py-3 text-center'>
                                <a href="#courses" className="hover:opacity-70 lineEffect mx-auto my-3" onClick={toggleMenu}>Courses</a>
                            </li>}
                            <li className='py-3 text-center'>
                                <a href="#contact" className="hover:opacity-70 lineEffect mx-auto my-3" onClick={toggleMenu}>Contact</a>
                            </li>
                            {!isLoggedIn && <li className='py-3 text-center'>
                                <p><span className='lineEffect cursor-pointer' onClick={() => Navigate('/login')}>Login</span> | <span className='lineEffect cursor-pointer' onClick={() => Navigate('/register')}>Register</span></p>
                            </li>}
                            {isLoggedIn && <li className='py-3 text-center'>
                                <p><span className='lineEffect cursor-pointer' onClick={handleLogout}>Logout</span></p>
                            </li>}
                        </ul>
                    </nav>
                </div>}
            </section>
        </header>
    )
}

export default Header