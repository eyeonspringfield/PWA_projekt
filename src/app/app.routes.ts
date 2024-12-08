import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {NgModule} from '@angular/core';
import {MainComponent} from './main/main/main.component';
import {PostComponent} from './post/post.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';
import {ConnectComponent} from './connect/connect.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'register', component: SignupComponent },
  { path: 'home', component: PostComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'terms', component: TermsComponent},
  {path: 'connect', component: ConnectComponent},
  { path: '**', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
