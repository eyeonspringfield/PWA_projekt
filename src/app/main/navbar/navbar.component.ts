import {Component, inject} from '@angular/core';
import { MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AnimationService} from '../../services/animation.service';
import {NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Auth, onAuthStateChanged, signOut} from '@angular/fire/auth';
import {ConnectionService} from '../../services/connection.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatButton, RouterLink, NgClass, NgIf, MatIconButton, MatIcon, RouterLinkActive],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  auth = inject(Auth);
  isLikeAnimating = false;
  isDownloadAnimating = false;
  isOffline: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private animationService: AnimationService, private connectionService: ConnectionService) {}

  ngOnInit() {
    this.animationService.likeAnimationState$.subscribe((state) => {
      this.isLikeAnimating = state;
    });
    this.animationService.downloadAnimationState$.subscribe((state) => {
      this.isDownloadAnimating = state;
    });

    this.connectionService.connectionState$.subscribe(state => {
      console.log('Connection state changed:', state);
      this.isOffline = !state;
    })

    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = user !== null;
    });
  }

  async onLogOut() {
    try {
      await signOut(this.auth);
      location.reload();
      console.log('User signed out');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  }
}
