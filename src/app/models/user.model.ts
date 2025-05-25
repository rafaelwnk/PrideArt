import { Post } from "./post.model";

export interface User {
    id: number,
    username: string,
    name: string,
    email: string,
    identity: string,
    password: string,
    posts: Post[];
}