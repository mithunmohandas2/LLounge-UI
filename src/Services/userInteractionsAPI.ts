import axios from 'axios';
import { baseUrlAPI } from '../app/links'

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

export {
    listAllCoursesForUserAPI,
    getNotificationsAPI,
    enrollCourseAPI,
    enrollCheckAPI,
    submitFeedbackAPI,
    courseFeedbacksAPI,
}