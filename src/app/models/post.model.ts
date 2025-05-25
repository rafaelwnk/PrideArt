import { User } from "./user.model";

export interface Post {
    id: number,
    title: string,
    image: string,
    description: string,
    userId: number,
    user: User,
    createdAt: Date,
    lastUpdate: Date;
}