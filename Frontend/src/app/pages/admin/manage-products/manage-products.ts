import { Component, inject } from '@angular/core';
import { PageSection } from '../../../components/global/page-section/page-section';
import { ProductService } from '../../../services/product-service';
import { ProductCard } from '../../../components/admin/product-card/product-card';
import { Placeholder } from '../../../components/products/placeholder/placeholder';
import { PlaceholderCard } from '../../../components/admin/placeholder-card/placeholder-card';
import { Router } from '@angular/router';

@Component({
  imports: [PageSection, Placeholder, ProductCard, PlaceholderCard],
  selector: 'app-manage-products',
  styleUrl: './manage-products.css',
  templateUrl: './manage-products.html',
})
export class ManageProducts {

  productService = inject(ProductService)
  router = inject(Router)
}
