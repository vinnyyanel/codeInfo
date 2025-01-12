import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {

  protected url = "http://localhost:8000";
  @Input() user : any;
  constructor(private authService:AuthService){
    console.log("this.user");
    console.log(this.user);
  }

  logout(){
    console.log("logout");
    this.authService.logout();
  }
}
