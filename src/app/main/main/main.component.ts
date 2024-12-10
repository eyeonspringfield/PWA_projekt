import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { PostComponent } from '../../post/post.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../../navbar/navbar.component';

@Component({
  selector: 'app-main',
  imports: [MatButtonModule, CommonModule, PostComponent, MatCardModule, MatChipsModule, RouterOutlet, NavbarComponent],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
