import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from 'src/app/product.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;
  public urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService ) {
    this.categories$ = categoryService.getCategories();
  }

productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required,
      Validators.pattern(this.urlRegex)]),
  });


get title() {
  return this.productForm.get('title');
}

get price() {
  return this.productForm.get('price');
}

get category() {
  return this.productForm.get('category');
}

get imageUrl() {
  return this.productForm.get('imageUrl');
}

revert() {
  this.productForm.reset();
}

  save() {
    this.productService.create(this.productForm.value);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
