import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from 'src/app/product.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  id;
  categories;
  public urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  product = { title: '', price: '', category: '', imageUrl: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService ) {
    this.categories = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.get(this.id).subscribe(p => this.product = p); }
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

delete() {
  if (!confirm('Are you sure you want to delete this product?')) { return; }
  this.productService.delete(this.id);
  this.router.navigate(['/admin/products']);

}

  save() {
    if (this.id) { this.productService.update(this.id, this.product); } else { this.productService.create(this.product); }
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
