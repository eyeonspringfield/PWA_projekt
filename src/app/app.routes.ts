import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {authGuard} from './auth.guard';

export const routes: Routes = [
  {path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)},
  {path: 'register', loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)},
  {path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)},
  {path: 'likes', canActivate: [authGuard], loadComponent: () => import('./likes/likes.component').then(c => c.LikesComponent)},
  {path: 'downloads', canActivate: [authGuard], loadComponent: () => import('./downloads/downloads.component').then(c => c.DownloadsComponent)},
  {path: 'search', loadComponent: () => import('./search/search.component').then(c => c.SearchComponent)},
  {path: 'privacy', loadComponent: () => import('./privacy/privacy.component').then(c => c.PrivacyComponent)},
  {path: 'terms', loadComponent: () => import('./terms/terms.component').then(c => c.TermsComponent)},
  {path: 'add', canActivate: [authGuard], loadComponent: () => import('./new-post/new-post.component').then(c => c.NewPostComponent)},
  {path: 'connect', loadComponent: () => import('./connect/connect.component').then(c => c.ConnectComponent)},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
