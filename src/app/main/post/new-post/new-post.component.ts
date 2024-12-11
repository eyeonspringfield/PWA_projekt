import {Component, computed, inject, model, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
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
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from '@angular/cdk/a11y';

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
    MatLabel,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatIcon
  ],
  templateUrl: './new-post.component.html',
  standalone: true,
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  titleControl = new FormControl('');
  uploadedFileName: string = "";
  protected fileURL: string = "";
  isLoading: boolean = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentTag = model('');
  readonly tags = signal(['Egyetem']);
  private allTags: string[] = [];
  readonly filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();
    return currentTag
      ? this.allTags.filter(tag => tag.toLowerCase().includes(currentTag))
      : this.allTags.slice();
  });

  readonly announcer = inject(LiveAnnouncer);

  constructor(private readonly newPostService: NewPostService, private readonly firestore: Firestore, private readonly router: Router) {
  }

  async ngOnInit() {
    this.allTags = await this.newPostService.loadCategories();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.update(tags => [...tags, value]);
    }
    this.currentTag.set('');
  }

  remove(tag: string): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      return [...tags];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.update(tags => [...tags, event.option.viewValue]);
    this.currentTag.set('');
    event.option.deselect();
  }

  async onSave() {
    try {
      const docRef = await addDoc(collection(this.firestore, "posts"), {
        title: this.titleControl.value,
        createdAt: Timestamp.now(),
        content: this.fileURL,
        tags: this.tags(),
      });

      for (const tag of this.tags()) {
        if(!this.allTags.includes(tag)) {
          await this.newPostService.updateCategories(tag);
        }
      }

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
