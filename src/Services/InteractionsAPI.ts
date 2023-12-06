import axios from 'axios';
import { baseUrlAPI } from '../app/links'

const SignupAPI = async (firstName: string, lastName: string, email: string, phone: string, password: string) => {
    try {
        const url = baseUrlAPI + '/user/register';    //Signup API endpoint
        const data = { email, firstName, lastName, phone, password };
        // console.log("data", data)   //test mode

        const response = await axios.post(url, data)
        if (response.data) {
            console.log('Response:', response);                   // all the user data received
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const LoginAPI = async (email: string, password: string) => {
    try {
        const url = baseUrlAPI + '/user/login';    // Verify Login API endpoint
        const data = { email, password };
        
        // console.log("data", data)   //test mode

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

export {
    SignupAPI,
    LoginAPI,
}