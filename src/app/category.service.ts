import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Categories } from './models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryRefList;

  constructor( private http: HttpClient ) { }

   getAll() {
  return this.http.get<Categories>('https://webshopsap1p2002529677trial.hanatrial.ondemand.com/WebShopSap/CategoriesRFC');
  }
}
