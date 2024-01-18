import axios from 'axios';
import { baseUrlAPI } from '../app/links'

const studentAssessmentAPI = async (data: { courseId: string, userId: string, marks: string }) => {
    try {
        const url = baseUrlAPI + `/tutor/assessment`;
        const response = await axios.put(url, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        console.error('Error:', (error as Error).message, '|', error);
        return error
    }
}

export {
    studentAssessmentAPI,
}