import { Injectable } from '@angular/core';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {

  constructor(private readonly firestore: Firestore) {}

  public loadCategories(){
    return ['Technology', 'Sports', 'Entertainment', 'Politics', 'Business', 'Science', 'Health', 'Travel', 'Food', 'Fashion', 'Lifestyle', 'Sci-Tech', 'Gaming', 'Nature', 'Music', 'Movies', 'TV', 'News', 'Other'];
  }

  public async addPost() {
    try {
      const docRef = await addDoc(collection(this.firestore, "posts"), {
        title: "fasz",
        content: "valamikontent/link.png",
        tags: ["szia", "tesztelek"],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}