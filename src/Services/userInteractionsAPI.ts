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

export {
    listAllCoursesForUserAPI,
}