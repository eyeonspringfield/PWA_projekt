import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FaIconComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(Auth);
  protected readonly faCircle = faCircle;
  email: string = '';
  password: string = '';

  constructor(private readonly router: Router) {
  }

  async signIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;
      await this.router.navigateByUrl("/home");
    } catch (error: any) {
      console.error('Error signing in:', error.message);
    }
  }
}
