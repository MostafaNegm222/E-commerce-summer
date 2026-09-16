import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { IUser } from '../../../models/iuser';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  ngOnInit(): void {
    const fetch = async () => {
      const res = await this.authService.getMe()
      console.log(await this.authService.getMe());
      this.user.set(res.data)
    }
    fetch ()
    // this.user.set(this.authService.getMe())
  }
  authService = inject(AuthService)
  user = signal<IUser | undefined>(undefined)
  router = inject(Router)


  logout () {
    this.authService.logout()
    this.router.navigateByUrl("/auth/login")
  }
}
