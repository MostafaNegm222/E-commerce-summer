import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product-service';
import { toast } from 'ngx-sonner';

@Component({
  imports: [],
  selector: 'app-delete-product',
  styleUrl: './delete-product.css',
  templateUrl: './delete-product.html',
})
export class DeleteProduct {

  activeModal = inject(NgbActiveModal);
  productService = inject(ProductService)

  async deleteItem () {
    try {
      const res:any = await this.productService.deleteProduct()
      console.log(res);
      toast.success(res.message)
      this.activeModal.close('delete')
    } catch (error:any) {
      console.log(error);
      toast.error(error.error.message)
    }
  }

}
