import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-state-card',
  styleUrl: './state-card.css',
  templateUrl: './state-card.html',
})
export class StateCard {
  state = input<any>()
}
