import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../models/api-response.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = "http://localhost:3000/v1/users";

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<ApiResponse<User[]>>(this.apiUrl);
    }


    getFollowedUsers() {
        return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/followed`);
    }
}