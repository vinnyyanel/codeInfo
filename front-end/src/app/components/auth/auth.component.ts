import { Component } from '@angular/core';
import { NgInputValidationComponent } from "ng-input-validation";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
