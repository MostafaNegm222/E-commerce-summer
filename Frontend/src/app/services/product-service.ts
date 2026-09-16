import { HttpClient, httpResource } from '@angular/common/http';
import { debounced, inject, Service, signal } from '@angular/core';
import { IProduct, ProductResponse } from '../models/iproduct';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Service()
export class ProductService {
  private _http = inject(HttpClient)
  apiLink = `https://e-commerce-summer-8bo1.vercel.app/products`
  id = signal("")
  category = signal("")
  sort = signal("")
  search = signal("")
  debounceSearch = debounced(this.search,500)
  page = signal(1)
  limit = signal(10)


  products = httpResource<ProductResponse<IProduct[]>>(() => `${this.apiLink}?search=${this.debounceSearch.value()}&sort=${this.sort()}${this.category() ? `&category=${this.category()}` : ``}&page=${this.page()}&limit=${this.limit()}`)
  product = httpResource<ProductResponse<IProduct>>(() => `${this.apiLink}/${this.id()}`)
  status = httpResource<ApiResponse<any>>(() => `${this.apiLink}/get-states`)

  async addProduct (product:Omit<IProduct , '_id' | "createdAt" | 'updatedAt'>) {
    const res  = await firstValueFrom(this._http.post(this.apiLink,product))
    this.products.reload()
    return res
  }
  async updateProduct (product:Partial<IProduct>) {
    const res  = await firstValueFrom(this._http.patch(`${this.apiLink}/${this.id()}`,product))
    this.products.reload()
    return res
  }
  async deleteProduct () {
    const res  = await firstValueFrom(this._http.patch(`${this.apiLink}/${this.id()}/soft-delete`,{}))
    this.products.reload()
    return res
  }

}
