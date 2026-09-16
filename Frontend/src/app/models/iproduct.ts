import { ApiResponse } from "./api-response"

type categoryType = 'clothes' | 'sports' | 'electronics' | ''
export interface IProduct {
  name : string ,
  price : number ,
  category : categoryType ,
  image : string ,
  description : string ,
  _id : string ,
  createdAt : Date ,
  updatedAt : Date
}


export interface ProductResponse<T> extends ApiResponse<T> {
  results : number ,
  productsCount : number
}
