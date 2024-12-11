import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  public connectionState$: Observable<boolean>;

  constructor() {
    this.connectionState$ = new Observable<boolean>((subscriber) => {
      // Emit the initial online status
      subscriber.next(navigator.onLine);

      // Check the online status every second
      const interval = setInterval(() => {
        subscriber.next(navigator.onLine);
      }, 1000);

      // Clean up the interval when unsubscribed
      return () => {
        clearInterval(interval);
        console.log('Stopped checking connection status');
      };
    });
  }
}
