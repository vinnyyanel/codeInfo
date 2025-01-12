import { NgFor } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [

    RouterLink,
    NgFor,

  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.css'
})
export class ContentListComponent implements OnChanges{

  protected url = "http://localhost:8000";
  @Input() posts:any;
constructor(){
  console.log("ContentListComponent");
  console.log(this.posts);
}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("chngment",changes);
    console.log(changes['posts'].previousValue);
    console.log(changes['posts'].currentValue);

  }
}
