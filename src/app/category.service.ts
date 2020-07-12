import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Categories } from './models/categories';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryRefList: Observable<any>;

  constructor( private http: HttpClient ) { }

   getAll() {
     this.categoryRefList = this.http.get<any>('https://webshopsapp2002529677trial.hanatrial.ondemand.com/WebShopSap/CategoriesRFC');
     return this.categoryRefList
    .pipe(map(data => {
      data.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }
}
