import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-sort',
  styleUrl: './sort.css',
  templateUrl: './sort.html',
})
export class Sort {
  productService = inject(ProductService)
}
