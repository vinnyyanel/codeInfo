import { ChangeDetectorRef, Component } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
import { ContentListComponent } from '../post-list/content-list/content-list.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ContentListComponent,
    NgFor,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
config = {
    apiKey: 'wcatzhst66wftc3os4ouaxm21cl3tw56qczpbdnrxdum517n'
  };
  searchControl = new FormControl('');
  isLoading:boolean = false;
  posts:any[]=[] ;
  message:string="";
  debut:boolean=false;

  constructor( private postService:PostService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    // Écouter les changements dans le champ de recherche
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Attendre 300 ms après chaque frappe
        distinctUntilChanged(), // Ignorer si la valeur n'a pas changé
        switchMap((query) => {
          console.log('switchmatch');
          this.debut = true;
          this.isLoading =true;
          if (query) {
            console.log('query op');
            return this.postService.searchPost(query); // Appeler l'API
          } else {
            return []; // Retourner un tableau vide si la requête est vide
          }
        })
      )
      .subscribe({next:(res) => {
        console.log('subscribe');
        this.posts = res.posts; // Mettre à jour les résultats
        console.log(res.posts);
        this.isLoading =false;
        this.cdr.detectChanges();
      },error:(error)=>{
        console.log('error');
        console.log(error);
        this.message=error.mesage;
        this.isLoading =false;
        this.cdr.detectChanges();
      }});
  }
}
