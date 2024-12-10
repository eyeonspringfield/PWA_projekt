import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NgModule} from '@angular/core';
import {MainComponent} from './main/main/main.component';
import {PostComponent} from './post/post.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';
import {ConnectComponent} from './connect/connect.component';
import {HomeComponent} from './home/home.component';
import {NewPostComponent} from './new-post/new-post.component';

export const routes: Routes = [
  {path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)},
  {path: 'register', loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)},
  {path: 'home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)},
  {path: 'likes', loadComponent: () => import('./likes/likes.component').then(c => c.LikesComponent)},
  {path: 'privacy', loadComponent: () => import('./privacy/privacy.component').then(c => c.PrivacyComponent)},
  {path: 'terms', loadComponent: () => import('./terms/terms.component').then(c => c.TermsComponent)},
  {path: 'add', loadComponent: () => import('./new-post/new-post.component').then(c => c.NewPostComponent)},
  {path: 'connect', loadComponent: () => import('./connect/connect.component').then(c => c.ConnectComponent)},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
