import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProduct } from '../../../pages/admin/edit-product/edit-product';
import { ProductService } from '../../../services/product-service';
import { DeleteProduct } from '../../../pages/admin/delete-product/delete-product';

@Component({
  imports: [DatePipe,CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input<IProduct>()

  private modalService = inject(NgbModal);
  productService = inject(ProductService)
  
	open(id:string='') {
		const modalRef = this.modalService.open(EditProduct);
    this.productService.id.set(id)
	}
	open1(id:string='') {
		const modalRef = this.modalService.open(DeleteProduct);
    this.productService.id.set(id)
	}
}
