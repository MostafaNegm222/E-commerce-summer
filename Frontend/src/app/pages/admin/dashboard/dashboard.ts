import { Component, inject } from '@angular/core';
import { PageSection } from '../../../components/global/page-section/page-section';
import { ProductCard } from '../../../components/admin/product-card/product-card';
import { StateCard } from '../../../components/admin/state-card/state-card';
import { ProductService } from '../../../services/product-service';

@Component({
  imports: [ProductCard,StateCard],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
    productsService = inject(ProductService)

}
