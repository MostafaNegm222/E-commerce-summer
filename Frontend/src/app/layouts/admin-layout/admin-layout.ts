import { Component, HostListener, signal } from '@angular/core';
import { Sidebar } from '../../components/admin/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Sidebar,RouterOutlet],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
 open= signal(false)
  isMobile = signal(window.innerWidth < 992);

  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < 992);

    if (!this.isMobile()) {
      this.open.set(false);
    }
  }

}
