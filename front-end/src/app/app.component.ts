import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from '@tinymce/tinymce-angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Code info';
}
