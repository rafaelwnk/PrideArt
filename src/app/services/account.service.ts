import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User, UserLogin, UserResetPassword } from "../models/user.model";
import { ApiResponse } from "../models/api-response.model";
import { Security } from "../utils/security.utils";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AccountService implements CanActivate {
    private apiUrl = "http://localhost:5131/v1/accounts";

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    public composeHeaders() {
        const token = Security.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return headers;
    }

    register(data: User) {
        return this.http.post<ApiResponse<string>>(`${this.apiUrl}/register`, data);
    }

    login(data: UserLogin) {
        return this.http.post<ApiResponse<string>>(`${this.apiUrl}/login`, data);
    }

    resetPassword(data: UserResetPassword) {
        return this.http.patch<ApiResponse<string>>(`${this.apiUrl}/reset-password`, data);
    }

    refreshToken() {
        return this.http.post<ApiResponse<string>>(`${this.apiUrl}/refresh-token`, null, {headers: this.composeHeaders()});
    }

    getLoggedInUser() {
        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/me`, { headers: this.composeHeaders() });
    }

    editProfile(data: User) {
        return this.http.put<ApiResponse<any>>(`${this.apiUrl}/edit-profile`, data, { headers: this.composeHeaders() })
    }

    deleteProfile() {
        return this.http.delete<ApiResponse<any>>(this.apiUrl, { headers: this.composeHeaders() });
    }

    getUsers() {
        return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/explore`, { headers: this.composeHeaders() });
    }

    getUserByUsername(username: string) {
        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${username}`, { headers: this.composeHeaders() });
    }

    follow(username: string) {
        return this.http.post<ApiResponse<User>>(`${this.apiUrl}/${username}/follow`, null, { headers: this.composeHeaders() });
    }

    unfollow(username: string) {
        return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/${username}/unfollow`, { headers: this.composeHeaders() });
    }

    getFollowingUsers() {
        return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/following`, { headers: this.composeHeaders() });
    }

    canActivate() {
        if(!Security.hasToken()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}