import { Component, inject } from '@angular/core';
import { ProductForm } from '../../../components/products/product-form/product-form';
import { PageSection } from '../../../components/global/page-section/page-section';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';
import { IProduct } from '../../../models/iproduct';
import { toast } from 'ngx-sonner';

@Component({
  imports: [ProductForm, PageSection],
  selector: 'app-add-product',
  styleUrl: './add-product.css',
  templateUrl: './add-product.html',
})
export class AddProduct {

  productService = inject(ProductService)
  router = inject(Router)


  async addProductForm (data:Omit<IProduct , '_id' | "createdAt" | 'updatedAt'>) {
    try {
      const res = await this.productService.addProduct(data)
      console.log(res);
      this.router.navigateByUrl('/admin/products')
      toast.success('Product is added successfully')
    } catch (error:any) {
      console.log(error);
      toast.error(error.error.message)
    }
  }
}
