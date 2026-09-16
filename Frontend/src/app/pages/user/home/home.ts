import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageSection } from '../../../components/global/page-section/page-section';
import { Observable, Subscription } from 'rxjs';
import { Test } from '../../../services/test';

@Component({
  imports: [PageSection],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  ngOnInit(): void {
    this.products = this.productService.getAll()
  }

  constructor (private productService:Test) {}
  // productService = new Test()
  products:any = []

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe()
  // }
  // ngOnInit(): void {
  //   this.subscription = this.observable.subscribe({
  //     next : (value) => console.log(value),
  //     error : (err) => console.log(`Error : ${err}`),
  //     complete : () => console.log("Done ✅")
  //   })
  // }
  // subscription!:Subscription
  // notification = ["notif 1" , "notif 2" , "nof" , "notif 3"]
  // observable = new Observable((sub) => {
    // setTimeout(() => {
    //   sub.next(1)
    //   sub.next(2)
    //   sub.next(3)
    // },0)
    // sub.complete()
    // let count = 0
    // setInterval(() => {
    //   sub.next(this.notification[count++])
    //   if(this.notification[count] == "") sub.error(`Can't send empty notification`)
    //   if (count == this.notification.length) sub.complete()
    // },1000)
  //   let count = 0
  //   let counter = setInterval(() => {
  //     sub.next(count++)
  //   },1000)
  //   return function () {
  //     clearInterval(counter)
  //   }
  // })

}
