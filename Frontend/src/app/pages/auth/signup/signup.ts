import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { IUser } from '../../../models/iuser';
import { form, FormField, minLength, pattern, required, submit } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  imports: [FormField],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {

  authService = inject(AuthService)
  router = inject(Router)

  signupModel = signal<Pick<IUser , "email" | "password" | "name" | "image">>({
    email : "" ,
    password : "",
    name : "" ,
    image : ""
  })


  signupForm = form(this.signupModel , schema => {
    required(schema.email , {message: "Email is Required"}),
    required(schema.password , {message: "Password is Required"}),
    required(schema.name , {message: "Name is Required"}),
    required(schema.image , {message: "Image is Required"}),
    // pattern(schema.email , )
    minLength(schema.name,3,{message:"Name must be 3 char or more"})
    minLength(schema.password,6,{message:"Password must be 6 char or more"})
  })

  showError (field:any) {
    return field.errors().length && (field.touched() || field.dirty())
  }


  onSubmit (e:Event) {
    e.preventDefault()
    submit(this.signupForm , async data => {
      try {
        const res:any = await this.authService.signup(data().value())
        toast.success('signup success, Please check your email to confirm email')
        console.log(res);
        sessionStorage.setItem("email",res.data.email)
        this.router.navigateByUrl('/auth/confirm-email')
      } catch (error:any) {
        console.error(error)
        toast.error(error.error.message)
      }
    })
  }


}
