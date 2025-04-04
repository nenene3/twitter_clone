export interface IPost {
    _id: string;
    title: string;
    content: string;
    author: IUser;
    createdAt: Date;
}


export interface IUser {
    _id: string;
    username: string;
    email: string;
    createdAt: Date;
}




