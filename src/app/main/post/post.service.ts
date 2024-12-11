import { Injectable } from '@angular/core';
import {AnimationService} from '../../services/animation.service';
import {IndexedDBService} from '../../services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private animationService: AnimationService, private indexedDBService: IndexedDBService) { }

  async saveLiked(post: any){
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (!likedPosts.includes(post.id)) {
      likedPosts.push(post.id);
      console.log("Post liked: " + post.id);
      this.animationService.triggerLikeAnimation();
      this.updateLocalStorage(likedPosts);
      return true;
    } else {
      likedPosts = likedPosts.filter((p: any) => p !== post.id);
      console.log("Post unliked: " + post.id);
      this.updateLocalStorage(likedPosts);
      return false;
    }
  }

  private updateLocalStorage(likedPosts: any[]) {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }

  savePost(post: any) {
    return new Promise<void>((resolve, reject) => {
      this.indexedDBService.savePost(post).then(() => {
        resolve()
      }).catch((error) => {
        reject(error);
      });
    })
  }
}
