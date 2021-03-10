import { Products } from './../models/products.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private dbPath = '/products';

  productsRef: AngularFirestoreCollection<Products>;

  constructor(private db: AngularFirestore) {
    this.productsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Products> {
    return this.productsRef;
  }

  create(products: Products): any {
    return this.productsRef.add({ ...products });
  }

  update(id: string, data: any): Promise<void> {
    return this.productsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.productsRef.doc(id).delete();
  }
}
