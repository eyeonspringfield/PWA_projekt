import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatFabButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatChip} from '@angular/material/chips';
import {PostComponent} from '../post/post.component';
import {HomeService} from './home.service';
import {IndexedDBService} from '../indexed-db.service';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  imports: [
    MatFabButton,
    MatIconModule,
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    MatChip,
    PostComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  auth = inject(Auth);
  protected posts: any[] = [];
  private downloadedPosts: any[] = [];
  isOnline: boolean = true;
  isLoggedIn: boolean = false;

  constructor(private homeService: HomeService, private router: Router, private indexedDBService: IndexedDBService) {
  }

  ngOnInit(){
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
    });

    if(navigator.onLine){
    this.loadDocuments().then(
      () => console.log("loaded")
    )
    }else{
      this.isOnline = false;
    }

    document.addEventListener('online', () => {
      location.reload();
    })
  }

  async loadDocuments() {
    try {
      this.posts = await this.homeService.getAllDocuments('posts');
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  }
}
