import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../../services/auth.service';
import { NoConnectComponent } from './no-connect/no-connect.component';
import { ConnectComponent } from './connect/connect.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    NoConnectComponent,
    ConnectComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 private authService = inject(AuthService);
 isLog = false;
 user : any;
 constructor(){
  if (localStorage.getItem(this.authService.tokenKey)) {
    this.isLog = true;
    this.user = this.authService.getUser();
    console.log(this.user);
    console.log("this.authService.getUser");
    console.log(this.user);
  }
 }
}
