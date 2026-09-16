import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {
  productService = inject(ProductService)
}
