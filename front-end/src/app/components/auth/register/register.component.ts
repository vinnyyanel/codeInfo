import { ChangeDetectorRef, Component } from '@angular/core';
import { NgInputValidationComponent } from "ng-input-validation";
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { NgIf } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgInputValidationComponent,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form : FormGroup;
  isLoading:boolean = false;
  photo:any;
 customMessages = {
    required: 'Ce champ est obligatoire.',
    email: 'Veuillez entrer un e-mail valide.',
    pattern: 'Le format du champ est invalide.'
  };

  constructor(private fb:FormBuilder, private authService:AuthService,private cdr:ChangeDetectorRef, private router:Router ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }
  );
}
passwordMatchValidator(): boolean {
  return this.form.value.password === this.form.value.confirmPassword ? true : false;
}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];
      this.photo = file;
    }
  }

  onSubmit(){
    this.isLoading = true;
    const formData = new FormData();

    // Ajoutez les autres champs du formulaire
    formData.append('username', this.form.get('username')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('photo', this.photo);

    // Ajoutez l'image (photo) si elle existe
    if (this.photo) {
      formData.append('photo', this.photo);
    }
    console.log(this.form.value);
    console.log("tete");
    this.authService.register(formData).subscribe({
      next:res=>{
        console.log(res.message);
        this.isLoading = false;
        this.form.reset();
        this.cdr.detectChanges();
        this.router.navigate(['login']);
      },error:error=>{
        console.log(error.message);
        console.log("error.message");
         error.message;
      }
    });
  }

}
