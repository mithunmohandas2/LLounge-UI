import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import backgroundImg from '/images/loginBg.jpg';
import { isValidEmail, isValidName, isValidPassword, isValidPhoneNumber } from '../../Services/validations'
import { SignupAPI } from '../../Services/InteractionsAPI';

function Resgister() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const Navigate = useNavigate()
    const Logo = '/images/LL-Logo.png'

    const handleSignup = async (event: { preventDefault: () => void; }) => {
        try {
            event.preventDefault()
            if (password !== password2) {
                return toast('Password mismatch', { icon: '⛔', });
            }
            setFirstName(firstName.trimEnd());
            setLastName(lastName.trimEnd());
            setEmail((email).trimEnd());

            console.log(firstName, lastName, email, phone, password)   //test mode

            if (!firstName || !email || !password || !phone) {
                return toast.error("Missing required fields");
            }

            if (!isValidName(firstName)) {             // Validate email format
                return toast.error("Invalid Name");
            }

            if (!isValidEmail(email)) {             // Validate email format
                return toast.error("Invalid email format");
            }

            if (!isValidPhoneNumber(phone)) {        // Validate phone number
                return toast.error("Invalid phone number");
            }

            if (!isValidPassword(password)) {        // Validate password
                return toast.error("Password must be at least 6 characters long");
            }

            const response = await SignupAPI(firstName, lastName, email, phone, password);
            // console.log("Reg", response?.response?.data?.message)    //test
            if (response.data) {
                toast.success(' Signup successful \n Please Login to continue');
                setTimeout(() => {
                    // console.log("token",response.token)
                    // localStorage.setItem("token", response.token);
                    Navigate('/login')                                         
                }, 2000);
            } else {
                toast.error(response?.response?.data?.message)
            }

        } catch (error) {
            console.log((error as Error).message);
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
                                    onChange={(input) => setEmail(input.target.value.toLowerCase())} />
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
                            <button type="submit" className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Register as Student</button>
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