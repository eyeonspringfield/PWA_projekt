import { Injectable } from '@angular/core';
import {collection, Firestore, getDocs, orderBy, query, where} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private readonly firestore: Firestore) { }

  async getSearch(collectionName: string, tag: string) {
    const colRef = collection(this.firestore, collectionName);
    const q = query(colRef,
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    });
  }
}
