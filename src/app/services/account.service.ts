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
    private apiUrl = "http://localhost:3000/v1/accounts";

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    public composeHeaders() {
        const token = Security.getToken();
        const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
        return headers;
    }

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
        return this.http.post<ApiResponse<string>>(`${this.apiUrl}/refresh-token`, null, {headers: this.composeHeaders()});
    }

    getLoggedInUser() {
        return this.http.get<ApiResponse<User>>(this.apiUrl, { headers: this.composeHeaders() });
    }

    canActivate() {
        if(!Security.hasToken()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}