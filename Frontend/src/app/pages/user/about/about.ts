import { Component, OnInit } from '@angular/core';
import { PageSection } from '../../../components/global/page-section/page-section';
import { Test } from '../../../services/test';

@Component({
  imports: [PageSection],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements OnInit {
  constructor (private productService:Test) {}
  ngOnInit(): void {
    this.productService.add({id:3,name:"product 3" , price:600})
    this.products = this.productService.getAll()
  }

  // productService = new Test()
  products:any = []
}
