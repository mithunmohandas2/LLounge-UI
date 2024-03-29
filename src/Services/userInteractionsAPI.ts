import axios from 'axios';
import { baseUrlAPI } from '../app/links'
import { certificate } from '../types/certificateType';

const listAllCoursesForUserAPI = async () => {
    try {
        const url = baseUrlAPI + `/user/courses`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const getNotificationsAPI = async (_id: string) => {
    try {
        const url = baseUrlAPI + `/user/notifications?_id=${_id}`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const enrollCourseAPI = async (courseId: string, _id: string) => {
    try {
        const url = baseUrlAPI + `/user/course/enroll`;
        const data = {
            courseId, userId: _id
        }
        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const enrollCheckAPI = async (courseId: string, userId: string) => {
    try {
        const url = baseUrlAPI + `/user/course/enrollCheck`;
        const data = {
            courseId, userId
        }
        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const submitFeedbackAPI = async (data: { rating: number, review: string, courseId: string, userId: string }) => {
    try {
        const url = baseUrlAPI + `/user/feedback`;
        const response = await axios.post(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}


const courseFeedbacksAPI = async (courseId: string) => {
    try {
        if (!courseId) return [] //missing query
        const url = baseUrlAPI + `/user/feedback?courseId=${courseId}`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const getCertificateAPI = async (courseId: string, userId: string) => {
    try {
        if (!courseId) return [] //missing query
        const url = baseUrlAPI + `/user/certificate?courseId=${courseId}&userId=${userId}`;
        const response = await axios.get(url)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

const issueCertificateAPI = async (data: certificate) => {
    try { //create a new certificate
        const url = baseUrlAPI + `/user/certificate`;
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
    listAllCoursesForUserAPI,
    getNotificationsAPI,
    enrollCourseAPI,
    enrollCheckAPI,
    submitFeedbackAPI,
    courseFeedbacksAPI,
    getCertificateAPI,
    issueCertificateAPI,
}