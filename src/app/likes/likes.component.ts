import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LikesService} from './likes.service';
import {PostComponent} from '../post/post.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-likes',
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './likes.component.html',
  standalone: true,
  styleUrl: './likes.component.scss'
})
export class LikesComponent {
  protected posts: any[] = [];
  private likedPosts: any[] = [];

  constructor(private likesService: LikesService, private router: Router) {
  }

  ngOnInit(){
    this.likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');

    this.loadDocuments().then(
      () => console.log("loaded")
    )
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
