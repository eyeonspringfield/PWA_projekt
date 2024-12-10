import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatFabButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {MatChip} from '@angular/material/chips';
import {PostComponent} from '../post/post.component';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  imports: [
    MatFabButton,
    MatIconModule,
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    MatChip,
    PostComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected posts: any[] = [];

  constructor(private homeService: HomeService, private router: Router) {
  }

  ngOnInit(){
    this.loadDocuments().then(
      () => console.log("loaded")
    )
  }

  async loadDocuments() {
    try {
      this.posts = await this.homeService.getAllDocuments('posts');
      console.log(this.posts);
      console.log(this.posts[0].id);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  }
}
