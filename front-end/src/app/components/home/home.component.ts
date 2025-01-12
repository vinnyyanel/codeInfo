import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ContentComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
