import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { SignUpPageComponent } from './pages/account/sign-up-page/sign-up-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { FramePageComponent } from './pages/frame-page/frame-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AccountService } from './services/account.service';

export const routes: Routes = [
    {
        path: '',
        component: FramePageComponent,
        children: [
            { path: '', component: HomePageComponent},
            { path: 'explore', component: ExplorePageComponent, canActivate: [AccountService]},
            { path: 'artists', component: ArtistsPageComponent, canActivate: [AccountService]},
            { path: 'profile/:username', component: ProfilePageComponent, canActivate: [AccountService]}
        ]
        
    },
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'reset-password', component: ResetPasswordPageComponent }
];
