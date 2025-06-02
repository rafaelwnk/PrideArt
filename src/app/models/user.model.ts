import { Post } from "./post.model";

export interface User {
    id?: number,
    name: string,
    username: string,
    email: string,
    identity: string,
    bio?: string,
    image?: string,
    posts?: Post[];
    following: User[];
}

export interface UserLogin {
    username: string,
    password: string;
}

export interface UserResetPassword {
    email: string,
    newPassword: string
}