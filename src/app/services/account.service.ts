import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User, UserLogin, UserResetPassword } from "../models/user.model";
import { ApiResponse } from "../models/api-response.model";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private apiUrl = "http://localhost:3000/v1/accounts";

    constructor(private http: HttpClient) { }

    login(data: UserLogin) {
        return this.http.post<ApiResponse<string>>(`${this.apiUrl}/login`, data);
    }

    register(data: User) {
        return this.http.post<ApiResponse<string>>(`${this.apiUrl}/register`, data);
    }

    resetPassword(data: UserResetPassword) {
        return this.http.put<ApiResponse<string>>(`${this.apiUrl}/reset-password`, data);
    }

    refreshToken() {
        
    }
}