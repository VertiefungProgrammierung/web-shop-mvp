import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productRefList: AngularFireList<any>;
  productRefObject: AngularFireObject<any>;

  constructor( private db: AngularFireDatabase ) {
    this.productRefList = db.list('/products');
   }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
  return this.productRefList.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
  }

  get( productId ) {
  this.productRefObject = this.db.object('/products/');
  return this.productRefObject.snapshotChanges().pipe(
    map(changes =>
       ({ key: changes.payload.key, ...changes.payload.val() })
    )
  );
  }
}
