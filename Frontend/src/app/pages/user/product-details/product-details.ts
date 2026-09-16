import { Component, inject, OnInit } from '@angular/core';
import { PageSection } from '../../../components/global/page-section/page-section';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { Placeholder } from '../../../components/products/placeholder/placeholder';
import { Card } from '../../../components/products/card/card';

@Component({
  imports: [PageSection, Placeholder, Card ],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  ngOnInit(): void {
    this.productServices.id.set(this.route.snapshot.params["id"]);
    // this.route.params.subscribe({
    //   next : (value) => console.log(value["id"])
    // })
  }
  route = inject(ActivatedRoute)
  router = inject(Router)
  productServices = inject(ProductService)
}
