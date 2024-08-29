// export interface ManageCourse {
// }
export interface AdminId {
    _id?: string;
    firstName: string;
    lastName: string;
}

export interface CourseList {
    status: string;
    totalEstimatedTime: number;
    _id?: string;
    courseName: string;
    adminId: AdminId;
    updatedAt: Date;
    createdAt: Date;
}

export interface RootObject {
    message: string;
    data: CourseList[];
    error: any[];
}