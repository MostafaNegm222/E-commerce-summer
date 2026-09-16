import { Service } from '@angular/core';

@Service()
export class Test {

  data:any = [
    {id : 1 , name : "product 1" , price : 300},
    {id : 2 , name : "product 2" , price : 400},
  ]
  getAll () {
    return this.data
  }

  add (d:any) {
    this.data.push(d)
  }

}
