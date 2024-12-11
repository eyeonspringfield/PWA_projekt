import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LikesService} from './likes.service';
import {PostComponent} from '../post/post.component';
import {NgForOf, NgIf} from '@angular/common';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-likes',
  imports: [
    PostComponent,
    NgForOf,
    MatFabButton,
    MatIcon,
    NgIf,
    RouterLink
  ],
  templateUrl: './likes.component.html',
  standalone: true,
  styleUrl: './likes.component.scss'
})
export class LikesComponent {
  protected posts: any[] = [];
  private likedPosts: any[] = [];
  protected isOnline: boolean = true;

  constructor(private likesService: LikesService, private router: Router) {
  }

  ngOnInit(){
    this.likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');

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
      this.posts = await this.likesService.getAllDocuments('posts', this.likedPosts);
      console.log(this.posts);
      console.log(this.posts[0].id);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  }
}
