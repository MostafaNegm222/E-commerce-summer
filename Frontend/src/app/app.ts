import { Component, signal } from '@angular/core';
import { RouterOutlet, ɵEmptyOutletComponent } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  imports: [RouterOutlet, NgxSonnerToaster, ɵEmptyOutletComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
