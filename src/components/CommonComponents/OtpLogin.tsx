import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice'
import backgroundImg from '/images/loginBg.jpg'
import { OtpLoginAPI, sendOtpAPI } from '../../Services/InteractionsAPI';
import { isValidEmail } from '../../Services/validations';


function OtpLogin() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [sendOtpStatus, setSendOtpStatus] = useState('Send OTP')
    const Logo = '/images/LL-Logo.png'
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            Navigate('/home')   //if already logged in
        }
    }, [Navigate])


    const handleOtpLogin = async (event: { preventDefault: () => void; }) => {    //Submit the OTP and redirect to Home
        try {
            event.preventDefault()
            setEmail((email).toLowerCase().trimEnd())

            // console.log(email, otp)        //test mode
          const response = await OtpLoginAPI(email, otp);
            if (response.data) {
                toast.success(' Login successful');
                setTimeout(() => {
                    console.log("response", response)    //test
                    dispatch(login(response))
                    if (response.data?.role === 'tutor') Navigate('/tutor')
                    else if (response.data?.role === 'admin') Navigate('/admin')
                    else Navigate('/home')
                }, 2000);
            } else {
                toast.error(response?.response?.data?.message)
            }

        } catch (error) {
            console.log((error as Error).message);
        }
    }

    const handleSendOTP = async () => {
        if (!isValidEmail(email)) return toast.error('Invalid email format')
        setSendOtpStatus('Sending OTP...')

        const otpSucess = await sendOtpAPI(email)//otp sending route
        if (!otpSucess) return setSendOtpStatus('Send OTP')

        toast.success('OTP Send successfully')

        let timerOn = true;
        function timer(remaining: number) {
            var m = Math.floor(remaining / 60);
            var m_string = m.toString();
            var s = remaining % 60;
            var s_string = s.toString();
            m_string = m < 10 ? '0' + m_string : m_string;
            s_string = s < 10 ? '0' + s_string : s_string;

            setSendOtpStatus(`${m_string + ':' + s_string}`)
            remaining -= 1;

            if (remaining >= 0 && timerOn) {
                setTimeout(function () {
                    timer(remaining);
                }, 1000);
                return;
            }
            // after timeout
            setSendOtpStatus('Resend OTP')
        }
        timer(60);

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
            <div className='p-8 bg-slate-100 rounded-2xl sm:max-w-xs mx-auto'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-16 w-auto cursor-pointer zoomEffect" src={Logo} alt="Logo" onClick={() => Navigate("/")} />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">Sign in with email OTP</h2>
                </div>

                <div className="pt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <form className="space-y-4" onSubmit={handleOtpLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" pattern="^(?=.*[@])(?=.*[.]).{5,}$" placeholder="Enter email ID" value={email}
                                    onChange={(input) => setEmail(input.target.value)} />
                            </div>
                            <div className="text-sm flex justify-end mt-3">
                                {sendOtpStatus === 'Resend OTP' || sendOtpStatus === 'Send OTP' ? <p className="font-semibold text-cyan-600 hover:text-cyan-500 cursor-pointer" onClick={handleSendOTP}>{sendOtpStatus}</p> :
                                    <p className="font-semibold text-red-500">{sendOtpStatus}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">One Time Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="otp" name="otp" type="otp" required className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" placeholder="Enter Email OTP"
                                    // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                                    value={otp} onChange={(input) => setOtp(input.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have account?  <span className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500 cursor-pointer" onClick={() => Navigate("/register")}>Register</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OtpLogin