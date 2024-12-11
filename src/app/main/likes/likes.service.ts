import { Injectable } from '@angular/core';
import {collection, documentId, Firestore, getDocs, orderBy, query, where} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private readonly firestore: Firestore) { }

  async getAllDocuments(collectionName: string, postsArray: any[]) {
    const colRef = collection(this.firestore, collectionName);
    const q = query(colRef,
      where(documentId(), "in", postsArray),
      orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    });
  }
}
