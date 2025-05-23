import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { SignUpPageComponent } from './pages/account/sign-up-page/sign-up-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { FramePageComponent } from './pages/frame-page/frame-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: FramePageComponent,
        children: [
            { path: '', component: HomePageComponent}
        ]
        
    },
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'reset-password', component: ResetPasswordPageComponent }
];
