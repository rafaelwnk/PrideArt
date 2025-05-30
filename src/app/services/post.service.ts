import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response.model";
import { Post } from "../models/post.model";
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

    getPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/explore`, { headers: this.composeHeaders() });
    }

    getAllPostsByUsername(username: string) {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/${username}`, { headers: this.composeHeaders() });
    }

    getFollowingPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/following`, { headers: this.composeHeaders() });
    }

    getLikedPosts() {
        return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/liked`, { headers: this.composeHeaders() });
    }
}