import { User } from "./userTypes";

export interface feedback {
    _id?: string,
    courseId: string,
    userId: User,
    review: string,
    rating: number,
}