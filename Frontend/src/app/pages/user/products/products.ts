import { Component, inject, OnInit, signal } from '@angular/core';
import { PageSection } from '../../../components/global/page-section/page-section';
import { ProductService } from '../../../services/product-service';
import { IProduct, ProductResponse } from '../../../models/iproduct';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Placeholder } from '../../../components/products/placeholder/placeholder';
import { Card } from '../../../components/products/card/card';
import { Router } from '@angular/router';
import { Search } from '../../../components/products/search/search';
import { Sort } from '../../../components/products/sort/sort';
import { Filter } from '../../../components/products/filter/filter';
import { Pagination } from '../../../components/products/pagination/pagination';

@Component({
  imports: [PageSection, JsonPipe, Placeholder, Card, Search, Sort, Filter, Pagination],
selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  // ngOnInit(): void {
  //   this.productService.getAllProducts().subscribe({
  //     next : (res:any) => this.products.set(res.data)
  //   })
  // }
  // products = signal<IProduct[]>([])
  productService = inject(ProductService)
  router = inject(Router)
}
