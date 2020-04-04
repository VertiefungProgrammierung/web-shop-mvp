import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

products: Product[];
subscription: Subscription;
filteredProducts: Product[];
tableResource: DataTableResource<Product>;
items: Product[] = [];
itemCount: number;

  constructor( private productService: ProductService ) {
    this.subscription = this.productService.getAll().subscribe(p => {
      this.filteredProducts = this.products = p;
      this.initializeTable(this.products);
    });
   }

private initializeTable(products: Product[]) {
  this.tableResource = new DataTableResource(this.products);
  this.tableResource.query({ offset: 0 })
    .then(items => this.items = items);
  this.tableResource.count()
    .then(count => this.itemCount = count);
}

reloadItems(params) {
  if (!this.tableResource) { return; }
  this.tableResource.query(params).then(items => this.items = items);
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

}
