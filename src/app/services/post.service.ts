import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response.model";
import { NewPost, Post } from "../models/post.model";
import { Security } from "../utils/security.utils";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = "http://localhost:5131/v1/posts";

    constructor(private http: HttpClient) { }

    public composeHeaders() {
        const token = Security.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return headers;
    }

    createPost(data: NewPost) {
        return this.http.post<ApiResponse<any>>(this.apiUrl, data, { headers: this.composeHeaders() })
    }

    editPost(data: NewPost, id: number) {
        return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, data, { headers: this.composeHeaders() })
    }

    deletePost(id: number) {
        return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`, { headers: this.composeHeaders() })
    }

    getPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/explore`, { headers: this.composeHeaders() });
    }

    getAllPostsByUsername(username: string) {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/${username}`, { headers: this.composeHeaders() });
    }

    getFollowingPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/following`, { headers: this.composeHeaders() });
    }

    likePost(id: number) {
        return this.http.post<ApiResponse<Post>>(`${this.apiUrl}/like/${id}`, null, { headers: this.composeHeaders() })
    }

    getLikedPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/liked`, { headers: this.composeHeaders() });
    }

    unlikePost(id: number) {
        return this.http.delete<ApiResponse<Post>>(`${this.apiUrl}/unlike/${id}`, { headers: this.composeHeaders() })
    }
}