import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response.model";
import { Post } from "../models/post.model";
import { Security } from "../utils/security.utils";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = "http://localhost:3000/v1/posts";

    constructor(private http: HttpClient) { }

    public composeHeaders() {
        const token = Security.getToken();
        const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
        return headers;
    }

    getPosts() {
        return this.http.get<ApiResponse<Post[]>>(this.apiUrl);
    }

    getPostsByUsername(username: string) {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/${username}`);
    }

    getFollowedPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/followed`, { headers: this.composeHeaders() });
    }

    getLikedPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/liked`, { headers: this.composeHeaders() });
    }
}