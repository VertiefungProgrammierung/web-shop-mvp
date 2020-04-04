import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryRefList: AngularFireList<any>;

  constructor( private db: AngularFireDatabase ) { }

  getCategories() {
    this.categoryRefList = this.db.list('/categories', ref => ref.orderByChild('name'));
    return this.categoryRefList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );;
  }
}
