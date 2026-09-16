import { Component, input } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-card',
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  product = input<IProduct>()
}
