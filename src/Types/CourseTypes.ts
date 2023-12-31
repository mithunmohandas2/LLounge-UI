export interface courseData {
    _id?: string,
    courseId?: string,
    courseName: string,
    branchId: string,
    description: string,
    tutor?: string,
    fee: string,
    status?: string,
    isBlocked?: boolean;
    modules?: Module[],
    image?: string,
};

export interface Branch {
    _id: string;
    branchName: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Module {
    _id?: string;
    courseId: string;
    content: string;
    duration: string;
    materials?: string;
    modName: string;
}


