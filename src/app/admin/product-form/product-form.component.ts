import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from 'src/app/product.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  categories$: Observable<any[]>;

  constructor( categoryService: CategoryService, private productService: ProductService ) {
    this.categories$ = categoryService.getCategories();
  }

  save() {
    //this.productService.create(this.productForm.value);
    console.log(this.productForm.value);
  }

  ngOnInit(): void {
  }

}
