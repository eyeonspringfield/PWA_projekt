import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected readonly faCircle = faCircle;
}
