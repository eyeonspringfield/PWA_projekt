import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }
  private likeAnimationSubject = new BehaviorSubject<boolean>(false);
  likeAnimationState$ = this.likeAnimationSubject.asObservable();

  private downloadAnimationSubject = new BehaviorSubject<boolean>(false);
  downloadAnimationState$ = this.downloadAnimationSubject.asObservable();

  triggerLikeAnimation() {
    this.likeAnimationSubject.next(true);
    setTimeout(() => {
      this.likeAnimationSubject.next(false);
    }, 1000);
  }

  triggerDownloadAnimation() {
    this.downloadAnimationSubject.next(true);
    setTimeout(() => {
      this.downloadAnimationSubject.next(false);
    }, 1000);
  }
}
