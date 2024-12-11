import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: 'login', loadComponent: () => import('./main/login/login.component').then(c => c.LoginComponent)},
  {path: 'register', loadComponent: () => import('./main/signup/signup.component').then(c => c.SignupComponent)},
  {path: 'home', loadComponent: () => import('./main/home/home.component').then(c => c.HomeComponent)},
  {path: 'likes', canActivate: [authGuard], loadComponent: () => import('./main/likes/likes.component').then(c => c.LikesComponent)},
  {path: 'downloads', canActivate: [authGuard], loadComponent: () => import('./main/downloads/downloads.component').then(c => c.DownloadsComponent)},
  {path: 'search', loadComponent: () => import('./main/search/search.component').then(c => c.SearchComponent)},
  {path: 'privacy', loadComponent: () => import('./main/privacy/privacy.component').then(c => c.PrivacyComponent)},
  {path: 'terms', loadComponent: () => import('./main/terms/terms.component').then(c => c.TermsComponent)},
  {path: 'add', canActivate: [authGuard], loadComponent: () => import('./main/post/new-post/new-post.component').then(c => c.NewPostComponent)},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
