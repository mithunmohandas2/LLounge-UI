import axios from 'axios';
import { baseUrlAPI } from '../app/links'
import { Module, courseData } from '../types/courseTypes';

const SignupAPI = async (firstName: string, lastName: string, email: string, phone: string, password: string, role?: string) => {
    try {
        const url = baseUrlAPI + '/user/register';    //Signup API endpoint
        const data = role ? { email, firstName, lastName, phone, password, role } : { email, firstName, lastName, phone, password }

        const response = await axios.post(url, data)
        if (response.data) {
            // console.log('Response:', response);      // all the user data received
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

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}


const sendOtpAPI = async (email: string) => {
    try {
        const url = baseUrlAPI + '/user/sendOTP';
        const data = { email };

        const response = await axios.post(url, data)
        // console.log(response)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const OtpLoginAPI = async (email: string, otp: string) => {
    try {
        const url = baseUrlAPI + '/user/verifyOTP';    // Verify Login API endpoint
        const data = { email, otp };

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const loadUsersAPI = async (role: string) => {
    try {
        const url = baseUrlAPI + '/admin/listUsers';    // get user data based on role
        const data = { role };

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const blockUserAPI = async (_id: string) => {
    try {
        const url = baseUrlAPI + '/admin/blockUser';    // Block/Unblock based on _id
        const data = { _id };

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const tokenDecodeAPI = async (token: string) => {
    try {
        const url = baseUrlAPI + '/user/tokenDecode';    // get userData from token
        const data = { token };

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const createCourseAPI = async (courseData: courseData) => {
    try {
        const url = baseUrlAPI + '/tutor/createCourse';
        const data = { ...courseData };

        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const editCourseAPI = async (courseData: courseData) => {
    try {
        const url = baseUrlAPI + '/tutor/editCourse';
        const data = { ...courseData };

        const response = await axios.put(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const listCoursesAPI = async (tutorId: string) => {
    try {
        const url = baseUrlAPI + `/tutor/courses?tutorId=${tutorId}`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const listBranchesAPI = async () => {
    try {
        const url = baseUrlAPI + `/admin/branches`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const listAllCoursesAPI = async () => {
    try {
        const url = baseUrlAPI + `/admin/courses`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const courseDetailsAPI = async (_id: string) => {
    try {
        const url = baseUrlAPI + `/user/courses?_id=${_id}`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const blockCoursesAPI = async (_id: string, role: string) => {
    try {
        const url = baseUrlAPI + `/${role}/blockCourse`;
        const data = { courseId: _id }
        const response = await axios.put(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const createModuleAPI = async (moduleData: Module) => {
    try {
        const url = baseUrlAPI + '/tutor/addModule';
        const data = { ...moduleData };

        const response = await axios.put(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const createBranchAPI = async (branchName: string) => {
    try {
        const url = baseUrlAPI + '/admin/createBranch';
        const data = { branchName: branchName }
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
    sendOtpAPI,
    OtpLoginAPI,
    loadUsersAPI,
    blockUserAPI,
    tokenDecodeAPI,
    createCourseAPI,
    editCourseAPI,
    listCoursesAPI,
    listBranchesAPI,
    listAllCoursesAPI,
    courseDetailsAPI,
    blockCoursesAPI,
    createModuleAPI,
    createBranchAPI,
}