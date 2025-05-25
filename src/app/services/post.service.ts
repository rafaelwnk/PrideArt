import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response.model";
import { Post } from "../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = "http://localhost:3000/v1/posts";

    constructor(private http: HttpClient) { }

    getPosts() {
        return this.http.get<ApiResponse<Post[]>>(this.apiUrl);
    }
}