import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgInputValidationComponent } from 'ng-input-validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      ReactiveFormsModule,
      NgInputValidationComponent,
      RouterLink,
      NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form : FormGroup;
  error : any = null;
  isLoading:boolean = false;
   customMessages = {
      required: 'Ce champ est obligatoire.',
      email: 'Veuillez entrer un e-mail valide.',
      pattern: 'Le format du champ est invalide.'
    };



    constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private cdr:ChangeDetectorRef) {
      this.form = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required]],
      }
    );
  }

  onSubmit(){
    this.isLoading = true;
    console.log(this.form.value);
    this.authService.login(this.form.value).subscribe({
      next:res=>{
        console.log(res.message);
        this.form.reset();
        this.authService.clearUserData();
        this.authService.storeUserData(res.user,res.token);
        this.isLoading = false;
        this.cdr.detectChanges();
        this.router.navigate(['home']);
      },error:error=>{
        console.log(error.message);
        this.error = 'email incorrect ou mot de passe';
      }
    });
  }
}
