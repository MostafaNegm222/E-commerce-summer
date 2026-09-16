import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { IUser } from '../../../models/iuser';
import { form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { ActivatedRoute, Router} from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  imports: [FormField],
  selector: 'app-reset-password',
  styleUrl: './reset-password.css',
  templateUrl: './reset-password.html',
})
export class ResetPassword implements OnInit {
  ngOnInit(): void {
    this.authService.resetToken.set(this.route.snapshot.params["token"])
  }


  authService = inject(AuthService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  resetModel = signal<Pick<IUser , "password">>({
    password : ""
  })


  resetForm = form(this.resetModel , schema => {
    required(schema.password , {message: "password is Required"}),
    minLength(schema.password,6,{message:"password must be 6 char or more"})
  })

  showError (field:any) {
    return field.errors().length && (field.touched() || field.dirty())
  }


  onSubmit (e:Event) {
    e.preventDefault()
    submit(this.resetForm , async data => {
      try {
        const res:any = await this.authService.resetPassword(data().value())
        toast.success('Reset password success')
        this.router.navigateByUrl("/auth/login")
        console.log(res);
      } catch (error:any) {
        console.error(error)
        toast.error(error.error.message)
      }
    })
  }


}
