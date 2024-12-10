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
  showFullImage: any;
  fullImageUrl: any;


  constructor() {}

  ngOnInit() {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    this.isLiked = likedPosts.includes(this.post.id);
  }

  onLikeButtonClicked(post: any){
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (!likedPosts.includes(post.id)) {
      likedPosts.push(post.id);
      console.log("Post liked: " + post.id);
      this.isLiked = true;
    } else {
      likedPosts = likedPosts.filter((p: any) => p !== post.id);
      console.log("Post unliked: " + post.id);
      this.isLiked = false;
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
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
