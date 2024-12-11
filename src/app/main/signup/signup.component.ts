import {Component, inject} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {from} from 'rxjs';
import {Auth, createUserWithEmailAndPassword, getAuth} from '@angular/fire/auth';
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-signup',
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
        FormsModule,
        FaIconComponent,
        RouterLink,
    ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  ngOnInit() {
    console.log("Signup component loaded");
  }
  auth = inject(Auth);
  private firestore = inject(Firestore);

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {
  }

  async onSignup() {
    if (this.password !== this.confirmPassword) {
      //TODO bad password dialogue thing
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);

      const user = userCredential.user;

      await addDoc(collection(this.firestore, 'users'), {
        uid: user.uid,
        username: this.username,
        email: this.email,
        createdAt: new Date(),
      });

      console.log('User registered successfully:', user);
      await this.router.navigateByUrl("/home");

    } catch (error: any) {
      console.error('Error during signup:', error.message);
      alert('Error during signup: ' + error.message);
    }
  }

    protected readonly faCircle = faCircle;
}
