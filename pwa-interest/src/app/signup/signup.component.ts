import {Component, inject} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {from} from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule,
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  ngOnInit() {
    console.log("Signup component loaded");
  }

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
  }
}
