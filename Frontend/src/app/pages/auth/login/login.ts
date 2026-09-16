import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { IUser } from '../../../models/iuser';
import { form, FormField, minLength, pattern, required, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  imports: [FormField,RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  authService = inject(AuthService)
  router = inject(Router)

  loginModel = signal<Pick<IUser , "email" | "password">>({
    email : "" ,
    password : ""
  })


  loginForm = form(this.loginModel , schema => {
    required(schema.email , {message: "Email is Required"}),
    required(schema.password , {message: "password is Required"}),
    // pattern(schema.email , )
    minLength(schema.password,6,{message:"password must be 6 char or more"})
  })

  showError (field:any) {
    return field.errors().length && (field.touched() || field.dirty())
  }


  onSubmit (e:Event) {
    e.preventDefault()
    submit(this.loginForm , async data => {
      try {
        const res:any = await this.authService.login(data().value())
        toast.success('Login success')
        localStorage.setItem("token",res.data.accessToken)
        console.log(res);
        const payload = this.authService.getPayloadFromToken()
        if(payload.role === "admin") {
          this.router.navigateByUrl('/admin')
        }else {
          this.router.navigateByUrl('/home')
        }
      } catch (error:any) {
        console.error(error)
        toast.error(error.error.message)
      }
    })
  }
}
