import { Component, effect, input, output, signal } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { form, FormField, min, minLength, required, submit } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {

  constructor () {
    effect(() => {
      const product = this.product()
      if(product) this.productModel.set(product)
    })
  }
  productModel = signal<Omit<IProduct , '_id' | "createdAt" | 'updatedAt'>>({
    name : '' ,
    price : 0 ,
    image : '' ,
    category : '' ,
    description : ''
  })

  product = input<Omit<IProduct , '_id' | "createdAt" | 'updatedAt'>>()

  productSubmit = output<Omit<IProduct , '_id' | "createdAt" | 'updatedAt'>>()

  productForm = form(this.productModel, schema => {
    required(schema.name , {message:'Name is Required'});
    required(schema.price , {message:'price is Required'});
    required(schema.image , {message:'image is Required'});
    required(schema.category , {message:'category is Required'});
    required(schema.description , {message:'description is Required'});
    minLength(schema.name ,3,{message:'Name must be 3 char or more'});
    minLength(schema.description ,3,{message:'description must be 3 char or more'});
    min(schema.price , 1 , {message : 'Price must be positive value'})
  })

  showError(field:any) {
    return field.errors().length && (field.touched() || field.dirty())
  }

  async onSubmit(e:Event) {
    e.preventDefault()
    submit(this.productForm,async data => {
      console.log(data().value());
      this.productSubmit.emit(data().value())
    })
  }
}
