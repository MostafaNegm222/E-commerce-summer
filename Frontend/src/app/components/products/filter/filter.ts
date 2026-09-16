import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-filter',
  styleUrl: './filter.css',
  templateUrl: './filter.html',
})
export class Filter {
  productService = inject(ProductService)
}
