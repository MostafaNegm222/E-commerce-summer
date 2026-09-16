import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductForm } from '../../../components/products/product-form/product-form';
import { ProductService } from '../../../services/product-service';
import { IProduct } from '../../../models/iproduct';
import { toast } from 'ngx-sonner';

@Component({
  imports: [ProductForm],
  selector: 'app-edit-product',
  styleUrl: './edit-product.css',
  templateUrl: './edit-product.html',
})
export class EditProduct {
  activeModal = inject(NgbActiveModal);
  productService = inject(ProductService)

  async updateData (data:Partial<IProduct>) {
    try {
      const res = await this.productService.updateProduct(data)
      console.log(res);
      toast.success(`Product is Updated successfully`)
      this.activeModal.close('update')
    } catch (error:any) {
      console.log(error);
      toast.error(error.error.message)
    }
  }
}
