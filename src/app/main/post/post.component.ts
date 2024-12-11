import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {NgIf} from '@angular/common';
import {AnimationService} from '../../services/animation.service';
import {PostService} from './post.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Router} from '@angular/router';
import {IndexedDBService} from '../../services/indexed-db.service';
import {MatIcon} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-post',
  imports: [MatButtonModule, MatCardModule, MatChipsModule, NgIf, MatProgressSpinner, MatIcon],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() post: any;
  @Input() tags: Array<string> = [];
  @Output() deletePost = new EventEmitter<any>;
  auth = inject(Auth);
  isLiked: boolean = false;
  isDownloaded: boolean = false;
  showFullImage: any;
  fullImageUrl: any;
  loading: boolean = false;
  loadingImage: boolean = true;
  isDownloadsPage: boolean = false;
  isDownloadsPageAndOffline: boolean = false;
  downloaded: boolean = false;
  private downloadedPosts: any[] = [];
  snackbar = inject(MatSnackBar);
  isLoggedIn: boolean = false;


  constructor(private animationService: AnimationService, private readonly postService: PostService, private router: Router, private indexedDBService: IndexedDBService) {}

  ngOnInit() {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    this.isLiked = likedPosts.includes(this.post.id);
    this.loadDownloadedPosts();
    this.checkIfDownloadsPage();
    this.isLoggedIn = this.auth.currentUser !== null;
  }

  onImageLoad() {
    console.log('image loaded');
    this.loadingImage = false;
  }

  async onLikeButtonClicked(post: any){
    this.isLiked = await this.postService.saveLiked(post)
  }

  viewFullImage(imageUrl: string) {
    this.fullImageUrl = imageUrl;
    this.showFullImage = true;
  }

  closeModal() {
    this.showFullImage = false;
  }

  onDownloadButtonClicked(post: any) {
    this.loading = true;
    this.postService.savePost(post).finally(() => {
      this.downloadedPosts.push(post);
      this.isDownloaded = true;
      this.loading = false;
      this.animationService.triggerDownloadAnimation();
    })
  }

  checkIfDownloadsPage() {
    console.log('router event');
    this.isDownloadsPage = this.router.url.includes('/downloads');
    if(!navigator.onLine && this.isDownloadsPage) {
      this.isDownloadsPageAndOffline = true;
    }
  }

  loadDownloadedPosts(){
    this.indexedDBService.getAllPosts().then(
      (posts) => {
        this.downloadedPosts = posts;
      }
    )
  }

  isPostDownloaded(post: any): boolean {
    return this.downloadedPosts.some(downloadedPost => downloadedPost.id === post.id);
  }

  onDeleteButtonClicked(post: any) {
    this.indexedDBService.deletePost(post).then(
      () => {
        this.deletePost.emit(post);
      }
    )
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'OK');
  }

  onTagClicked(tag: any) {
    this.router.navigate([`/search`], {queryParams: {tag}});
  }
}
