import { Component, inject, input } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product-service';

@Component({
  imports: [NgbPagination],
  selector: 'app-pagination',
  styleUrl: './pagination.css',
  templateUrl: './pagination.html',
})
export class Pagination {
  productService = inject(ProductService)
  total = input<number>(0)
}
