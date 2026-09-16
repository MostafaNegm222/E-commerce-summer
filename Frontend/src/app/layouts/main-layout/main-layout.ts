import { Component } from '@angular/core';
import { Navbar } from '../../components/global/navbar/navbar';
import { Footer } from '../../components/global/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Navbar, Footer,RouterOutlet],
  selector: 'app-main-layout',
  styleUrl: './main-layout.css',
  templateUrl: './main-layout.html',
})
export class MainLayout {}
