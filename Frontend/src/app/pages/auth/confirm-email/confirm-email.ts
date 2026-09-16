import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { IUser } from '../../../models/iuser';
import { form, FormField, minLength, pattern, required, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  imports: [FormField],
  selector: 'app-confirm-email',
  styleUrl: './confirm-email.css',
  templateUrl: './confirm-email.html',
})
export class ConfirmEmail {
  authService = inject(AuthService)
  router = inject(Router)

  confirmOTPModel = signal<Pick<IUser , "email" | "confirmOTP">>({
    email : "" ,
    confirmOTP : ""
  })


  confirmOTPForm = form(this.confirmOTPModel , schema => {
    required(schema.confirmOTP , {message: "confirm OTP is Required"}),
    minLength(schema.confirmOTP,6,{message:"confirm OTP must be 6 char"})
  })

  showError (field:any) {
    return field.errors().length && (field.touched() || field.dirty())
  }


  onSubmit (e:Event) {
    e.preventDefault()
    submit(this.confirmOTPForm , async data => {
      try {
        const email = sessionStorage.getItem("email") || ""
        const res:any = await this.authService.confirmEmail({...data().value(),email})
        toast.success('confirm Email success')
        console.log(res);
        this.router.navigateByUrl("/auth/login")
      } catch (error:any) {
        console.error(error)
        toast.error(error.error.message)
      }
    })
  }
}
