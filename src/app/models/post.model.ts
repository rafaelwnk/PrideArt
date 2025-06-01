import { User } from "./user.model";

export interface Post {
    id: number,
    title: string,
    image: string,
    description: string,
    userId: number,
    user: User,
    usersLiked: User[]
    createdAt: Date,
    lastUpdate: Date;
}

export interface NewPost {
    title: string,
    image: string,
    description: string,
}