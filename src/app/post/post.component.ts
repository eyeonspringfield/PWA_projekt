import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {NgOptimizedImage, NgIf} from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [MatButtonModule, MatCardModule, MatChipsModule, NgOptimizedImage, NgIf],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post: any;
  @Input() tags: Array<string> = [];
  isLiked: boolean = false;
  likedPosts: any[] = [];
  showFullImage: any;
  fullImageUrl: any;


  constructor() {}

  ngOnInit() {
    this.likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    this.isLiked = this.likedPosts.includes(this.post.id);
  }

  onLikeButtonClicked(post: any){

    if (!this.likedPosts.includes(post.id)) {
      this.likedPosts.push(post.id);
      localStorage.setItem('likedPosts', JSON.stringify(this.likedPosts));
      console.log("Post liked: " + post.id);
      this.isLiked = true;
    } else {
      this.likedPosts = this.likedPosts.filter(p => p !== post.id);
      localStorage.setItem('likedPosts', JSON.stringify(this.likedPosts));
      console.log("Post unliked: " + post.id);
      this.isLiked = false;
    }
  }

  viewFullImage(imageUrl: string) {
    this.fullImageUrl = imageUrl;
    this.showFullImage = true;  // Open the modal
  }

  // Function to close the modal
  closeModal() {
    this.showFullImage = false;  // Close the modal
  }
}
