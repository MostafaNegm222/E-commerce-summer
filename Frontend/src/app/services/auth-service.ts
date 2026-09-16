import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { IUser } from '../models/iuser';
import { ApiResponse } from '../models/api-response';
import { firstValueFrom } from 'rxjs';

@Service()
export class AuthService {
  private _http = inject(HttpClient)

  apiLink = `http://localhost:8000/auth`
  userLink = `http://localhost:8000/users`
  id = signal("")
  resetToken = signal('')
  currentUser = signal<IUser | null>(null)


  async login (data:Pick<IUser , "email" | "password">) {
    return firstValueFrom(this._http.post(`${this.apiLink}/login`,data))
  }

  async signup (data:Pick<IUser , "email" | "password" | "name" | "image">) {
    return firstValueFrom(this._http.post(`${this.apiLink}/signup`,data))
  }

  async confirmEmail (data:Pick<IUser , "email" | "confirmOTP">) {
    return firstValueFrom(this._http.post(`${this.apiLink}/confirm-email`,data))
  }

  async forgetPassword (data:Pick<IUser , "email">) {
    return firstValueFrom(this._http.post(`${this.apiLink}/forget-password`,data))
  }

  async resetPassword (data:Pick<IUser , "password">) {
    return firstValueFrom(this._http.post(`${this.apiLink}/reset-password/${this.resetToken()}`,data))
  }

  getToken () {
    return localStorage.getItem("token")
  }

  logout () {
    localStorage.removeItem("token")
  }

  getPayloadFromToken () {
    const token = this.getToken()
    if(!token) return null;
    try {
      const payload = token.split(".")[1]
      return JSON.parse(atob(payload))
    } catch  {
      return null
    }
  }

  async getMe () {
     return await firstValueFrom(this._http.get<ApiResponse<IUser>>(`${this.apiLink}/me`))
  }

}
