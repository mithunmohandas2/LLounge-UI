import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrlAPI } from '../../app/links'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user/userSlice'
import '../../components/CommonComponents/Header/Header.css'
import backgroundImg from '/images/loginBg.jpg'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const emailInput = useRef(null)
  const Logo = '/images/LL-Logo.png'
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //if already logged in
      Navigate('/home')
    }
    // (function () {     //focus on email input field
    //   emailInput.current.focus();
    // })()
  }, [Navigate])

  const handleLogin = async (event: { preventDefault: () => void; }) => {    //Submit the Login data and redirect to Home
    try {
      event.preventDefault()
      setEmail((email).toLowerCase().trimEnd())

      console.log(email, password)        //test mode

      const url = baseUrlAPI + '/login';    // Verify Login API endpoint
      const data = { email, password, };

      await axios.post(url, data)               //check from database
        .then(response => {
          if (response.data.error) throw Error(response.data.error)  //if any error throw error 
          // console.log('Response:', response.data);  // all the user data received
          dispatch(login(response.data))                              // Saving data to redux
          Navigate('/home')                                          // Login Success 
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error(error.message)
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
      <div className='p-8 bg-slate-100 rounded-2xl sm:max-w-xs mx-auto'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-16 w-auto cursor-pointer zoomEffect" src={Logo} alt="Logo" onClick={() => Navigate("/")} />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">Sign in to your account</h2>
        </div>

        <div className="pt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" pattern="^(?=.*[@])(?=.*[.]).{5,}$" placeholder="Enter email ID" value={email}
                  onChange={(input) => setEmail(input.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <p className="font-semibold text-cyan-600 hover:text-cyan-500 cursor-pointer" onClick={() => Navigate("/forgotPassword")}>Forgot password?</p>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" placeholder="Enter password"
                  // pattern="^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-=|]).{6,}$" 
                  value={password} onChange={(input) => setPassword(input.target.value)} />
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
  );
}

export default Login;
