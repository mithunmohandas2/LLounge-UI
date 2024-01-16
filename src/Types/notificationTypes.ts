export interface notifications {
    _id?: string;
    senderId: string;
    receiverId: string;
    courseId: string;
    message: string;
    createdAt: Date;
    expiresAt?: Date;
}