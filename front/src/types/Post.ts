export type  IPost = {
    _id: string;
    title: string;
    content: string;
    author: IUser;
    createdAt: Date;
}


export type IUser = {
    _id: string;
    username: string;
    email: string;
    createdAt: Date;
}




