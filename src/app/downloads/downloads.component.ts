import {ChangeDetectorRef, Component} from '@angular/core';
import {PostComponent} from '../post/post.component';
import {NgForOf} from '@angular/common';
import {IndexedDBService} from '../indexed-db.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-downloads',
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './downloads.component.html',
  standalone: true,
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {
  posts: any[] = [];


  constructor(private indexedDBService: IndexedDBService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.indexedDBService.getAllPosts().then(posts => {
      this.posts = posts;
      if (!navigator.onLine) {
        this.convertPostsToBlobUrls();
      }
    }).catch(err => {
      console.error('Error loading posts:', err);
    });
  }

  convertPostsToBlobUrls() {
    this.posts = this.posts.map(post => {
      if (post.image) {
        post.content = URL.createObjectURL(post.image);
      }
      return post;
    });
  }

  onPostDeleted(deletedPost: any) {
    this.posts = this.posts.filter(post => post.id !== deletedPost.id);
    this.loadPosts();
  }
}
