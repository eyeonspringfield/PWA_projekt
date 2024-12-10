import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NewPostService} from './new-post.service';
import {getDownloadURL, getStorage, ref, uploadBytes} from '@angular/fire/storage';
import {finalize} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {NgIf} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {addDoc, collection, Firestore, Timestamp} from '@angular/fire/firestore';

@Component({
  selector: 'app-new-post',
  imports: [
    MatButtonModule,
    MatAutocomplete,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteTrigger,
    MatFormField,
    RouterLink,
    NgIf,
    MatProgressSpinner,
    FormsModule,
    MatLabel
  ],
  templateUrl: './new-post.component.html',
  standalone: true,
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  options: string[] = []; //TODO getOptionsFromDB
  myControl = new FormControl('');
  titleControl = new FormControl('');
  uploadedFileName: string = "";
  protected fileURL: string = "";
  isLoading: boolean = false;

  constructor(private readonly newPostService: NewPostService, private readonly firestore: Firestore, private readonly router: Router) {
  }

  ngOnInit() {
    this.options = this.newPostService.loadCategories();
  }

  async onSave() {
    try {
      const docRef = await addDoc(collection(this.firestore, "posts"), {
        title: this.titleControl.value,
        createdAt: Timestamp.now(),
        content: this.fileURL,
        tags: ["szia", "tesztelek"],
      });
      console.log("Document written with ID: ", docRef.id);
      await this.router.navigateByUrl("/home");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const storage = getStorage();
    this.uploadedFileName = uuidv4();
    const refer = ref(storage, `images/${this.uploadedFileName}`);

    this.isLoading = true;

    uploadBytes(refer, file)
      .then(snapshot => {
        console.log('File uploaded successfully', snapshot);
        return getDownloadURL(refer); // Fetch the file URL after upload
      })
      .then(url => {
        this.fileURL = url; // Set the file URL to a state variable
        console.log('File URL:', this.fileURL);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      })
      .finally(() => this.isLoading = false);
  }
}
