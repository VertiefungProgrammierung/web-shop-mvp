import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productRefList: AngularFireList<any>;
  productRefObject: AngularFireObject<any>;

  constructor( private db: AngularFireDatabase, private httpClient: HttpClient ) {
   }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
  this.productRefList = this.db.list('/products');
  return this.productRefList.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  }

  get( productId ) {
  this.productRefObject = this.db.object('/products/' + productId);
  return this.productRefObject.snapshotChanges().pipe(
    map(changes =>
       ({ key: changes.payload.key, ...changes.payload.val() })
    )
  );
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
