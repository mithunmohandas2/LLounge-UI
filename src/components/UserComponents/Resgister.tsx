import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrlAPI } from '../../app/links'
import axios from 'axios'
// import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import backgroundImg from '/images/loginBg.jpg'

function Resgister() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const Navigate = useNavigate()
    // const inputFocus = useRef(null)
    const Logo = '/images/LL-Logo.png'

    const handleSignup = async (event: { preventDefault: () => void; }) => {     //Submit the signup data and redirect to login
        try {
            event.preventDefault()
            if (password !== password2) {
                return toast.error('Password mismatch')
                //  Swal.fire({
                //     icon: 'error',
                //     title: 'Password mismatch',
                // })
            }
            setFirstName(firstName.trimEnd());
            setLastName(lastName.trimEnd());
            setEmail((email).toLowerCase().trimEnd())

            console.log(firstName, lastName, email, phone, password, password2)   //test mode

            const url = baseUrlAPI + '/register';    //Signup API endpoint
            const data = { email, firstName, lastName, phone, password };

            await axios.post(url, data)               //check from database
                .then(response => {
                    console.log('Response:', response.data);                   // all the user data received
                    if (response.data.error) throw Error(response.data.error)  //if any error throw error 
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: "Signup successful",
                    //     text: "Please Login to continue"
                    // })
                    toast.success('Signup successful, Please Login to continue')
                    Navigate('/login')                                          // signup Success 
                })
                .catch(error => {
                    // console.error('Error:', error);
                    toast.error(error.message)
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: error.message,
                    // })
                });


        } catch (error: any) {
            console.log(error.message);
        }
    }
    const backgroundImageStyle = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-16 sm:py-10 lg:px-8" style={backgroundImageStyle}>
            <Toaster />
            <div className='p-8 bg-slate-100 rounded-2xl mx-auto'>
                <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                    <img className="mx-auto h-16 w-auto cursor-pointer zoomEffect" src={Logo} alt="Logo" onClick={() => Navigate("/")} />
                    <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">Create a new account</h2>
                </div>

                <div className="pt-10 sm:mx-auto w-full ">
                    <form className="space-y-6" onSubmit={handleSignup}>

                        <div className='flex flex-col sm:flex-row'>
                            <div className="mb-3">
                                <input id="firstName" name="firstName" type="name" required className="block w-full ps-2 sm:me-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" placeholder="First name" pattern="[A-Za-z ]*" minLength={3} value={firstName} onChange={(input) => { setFirstName(input.target.value.trimStart()) }} />
                            </div>
                            <div className="mb-3">
                                <input id="lastName" name="lastName" type="name" required className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" placeholder="Last name" pattern="[A-Za-z ]*" value={lastName}
                                    onChange={(input) => setLastName(input.target.value.trimStart())} />
                            </div>
                        </div>


                        <div className='flex flex-col sm:flex-row'>
                            <div className="mb-3">
                                <input id="email" name="email" type="email" required className="block w-full ps-2 sm:me-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" pattern="^(?=.*[@])(?=.*[.]).{5,}$" placeholder="Email address" value={email}
                                    onChange={(input) => setEmail(input.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input id="phone" name="phone" type="tel" required className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" placeholder="Phone number" value={phone}
                                    pattern="[0-9]*" minLength={10} onChange={(input) => setPhone(input.target.value)} />
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row'>
                            <div className="mb-3">
                                <input id="password" name="password" type="password" required className="block w-full ps-2 sm:me-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                    placeholder="Enter password" value={password}
                                    onChange={(input) => setPassword(input.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input id="password2" name="password2" type="password" autoComplete="name" required className="block w-full ps-2 sm:ms-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                    // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                    placeholder="Confirm password" value={password2} onChange={(input) => setPassword2(input.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Register</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Have an account?  <span className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 cursor-pointer" onClick={() => Navigate("/login")}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Resgister