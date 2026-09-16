import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { IUser } from '../../../models/iuser';
import { form, FormField, minLength, pattern, required, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
@Component({
  imports: [FormField],
  selector: 'app-forget-password',
  styleUrl: './forget-password.css',
  templateUrl: './forget-password.html',
})
export class ForgetPassword {

  authService = inject(AuthService)
  router = inject(Router)

  forgetModel = signal<Pick<IUser , "email">>({
    email : ""
  })


  forgetForm = form(this.forgetModel , schema => {
    required(schema.email , {message: "Email is Required"})
  })

  showError (field:any) {
    return field.errors().length && (field.touched() || field.dirty())
  }


  onSubmit (e:Event) {
    e.preventDefault()
    submit(this.forgetForm , async data => {
      try {
        const res:any = await this.authService.forgetPassword(data().value())
        toast.success('Link sent to your email')
        console.log(res);
      } catch (error:any) {
        console.error(error)
        toast.error(error.error.message)
      }
    })
  }

}
