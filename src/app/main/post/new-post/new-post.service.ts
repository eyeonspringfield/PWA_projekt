import { Injectable } from '@angular/core';
import {addDoc, collection, Firestore, getDoc, getDocs, Timestamp} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  private tags: string[] = [];

  constructor(private readonly firestore: Firestore) {}

  public async loadCategories() {
    const colRef = collection(this.firestore, "categories");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => doc.data()['name'] || "");
  }

  public async updateCategories(name: string) {
    const docRef = await addDoc(collection(this.firestore, "categories"), {
      name: name,
      createdAt: Timestamp.now()
    })
  }

  public async addPost() {
    try {
      const docRef = await addDoc(collection(this.firestore, "posts"), {
        title: "fasz",
        createdAt: Timestamp.now(),
        content: "valamikontent/link.png",
        tags: ["szia", "tesztelek"],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
