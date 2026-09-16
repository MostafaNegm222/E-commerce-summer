import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-page-section',
  styleUrl: './page-section.css',
  templateUrl: './page-section.html',
})
export class PageSection {
  title = input()
}
