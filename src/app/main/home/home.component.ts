import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatFabButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {NgForOf, NgIf} from '@angular/common';
import {PostComponent} from '../post/post.component';
import {HomeService} from './home.service';
import {IndexedDBService} from '../../services/indexed-db.service';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {ConnectionService} from '../../services/connection.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    MatFabButton,
    MatIconModule,
    RouterLink,
    NgForOf,
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
  private subscription: Subscription;

  constructor(private homeService: HomeService, private router: Router, private indexedDBService: IndexedDBService, private connectionService: ConnectionService) {
    this.subscription = this.connectionService.connectionState$.subscribe(status => {
      this.isOnline = status;
    })
  }

  ngOnInit(){
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
    });

    if(this.isOnline){
    this.loadDocuments().then(
      () => console.log("loaded")
    );
    }

    document.addEventListener('online', () => {
      location.reload();
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async loadDocuments() {
    try {
      this.posts = await this.homeService.getAllDocuments('posts');
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  }
}
