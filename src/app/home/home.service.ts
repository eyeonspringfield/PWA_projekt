import {Injectable} from '@angular/core';
import {collection, Firestore, getDocs} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private readonly firestore: Firestore) { }

  async getAllDocuments(collectionName: string) {
    const colRef = collection(this.firestore, collectionName); // Reference to the collection
    const snapshot = await getDocs(colRef); // Get documents from the collection

    return snapshot.docs.map(doc => {
      return {id: doc.id, ...doc.data()}; // Extracting the document id and data
    });
  }
}
