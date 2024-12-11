import { Injectable } from '@angular/core';
import {Firestore} from '@angular/fire/firestore';
import {finalize, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadedFileURL: any;

  constructor(private readonly storage: AngularFireStorage) { }

  /*uploadImage(event: Event) {
    const file = event.target.files[0];
    const filePath = `uploads/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.uploadedFileURL = url;
          });
        })
      )
      .subscribe();
  }*/

  getFileURL() {
    return this.uploadedFileURL;
  }
}
