import { Post } from "./post.model";

export interface User {
    id?: number,
    username: string,
    name: string,
    email: string,
    identity: string,
    bio?: string,
    image?: string,
    posts?: Post[];
}

export interface UserLogin {
    username: string,
    password: string;
}

export interface UserResetPassword {
    email: string,
    newPassword: string
}