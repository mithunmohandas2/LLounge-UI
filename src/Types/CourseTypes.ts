export interface courseData {
    _id?:string,
    courseName:string,
    branchId:string,
    description:string,
    tutor:string,
    fee:string,
};

export interface Branch extends Document {
    _id: string;
    branchName: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Module extends Document {
    courseId: string;
    content: string;
    duration: string;
    materials: string;
    modName: string;
}


