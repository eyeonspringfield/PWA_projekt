import {Injectable} from '@angular/core';
import {collection, Firestore, getDocs, orderBy, query} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private readonly firestore: Firestore) { }

  async getAllDocuments(collectionName: string) {
    const colRef = collection(this.firestore, collectionName);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q); // Get documents from the collection
    return snapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}; // Extracting the document id and data
    });
  }
}
