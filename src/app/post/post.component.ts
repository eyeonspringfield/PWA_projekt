import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [MatButtonModule, MatCardModule, MatChipsModule, NgOptimizedImage],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() tags: Array<string> = [];


  constructor() {}

  ngOnInit() {
    console.log(this.tags);
  }
}
