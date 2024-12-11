import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IndexedDBService {
  private dbName = 'PostsDB';
  private storeName = 'posts';

  constructor() {
    this.initDB();
  }

  private initDB() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      console.log('IndexedDB initialized successfully');
    };

    request.onerror = (event) => {
      console.error('IndexedDB initialization error:', event);
    };
  }

  savePost(post: any): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(post.content)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error('Error fetching post image');
          }
          const image = await response.blob();
          const postWithImage = { ...post, image };
          const request = indexedDB.open(this.dbName, 1);

          request.onsuccess = (event: any) => {
            const db = event.target.result;
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const addRequest = store.put(postWithImage);

            addRequest.onsuccess = () => {
              console.log('Post saved to IndexedDB:', postWithImage);
              resolve();
            };

            addRequest.onerror = (err: any) => {
              console.error('Error saving post to IndexedDB:', err);
              reject(err);
            };
          };

          request.onerror = (err: any) => {
            console.error('Error opening IndexedDB:', err);
            reject(err);
          };
        })
        .catch((err) => {
          console.error('Error in savePost:', err);
          reject(err);
        });
    });
  }

  getAllPosts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
          resolve(getAllRequest.result);
        };

        getAllRequest.onerror = (err: any) => {
          reject(err);
        };
      };

      request.onerror = (err) => {
        reject(err);
      };
    });
  }

  deletePost(post: any) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const deleteRequest = store.delete(post.id);

        deleteRequest.onsuccess = () => {
          resolve(deleteRequest.result);
        };
        deleteRequest.onerror = (err: any) => {
          reject(err);
        };
      }
    })
  }
}
