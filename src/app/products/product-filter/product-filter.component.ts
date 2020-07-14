import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories: Categories;
  @Input('category') category;

  constructor(
    categoryService: CategoryService,
    ) {
      categoryService.getAll().pipe().subscribe(data =>
        console.log('Cat ', this.categories = data));
    }

  ngOnInit(): void {
  }

}
