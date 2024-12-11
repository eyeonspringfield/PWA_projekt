import { Component } from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PostComponent} from '../post/post.component';
import {NgForOf} from '@angular/common';
import {SearchService} from './search.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatIconButton,
    MatLabel,
    MatIcon,
    PostComponent,
    NgForOf,
    MatPrefix,
    MatSuffix
  ],
  templateUrl: './search.component.html',
  standalone: true,
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  posts: any[] = [];
  searchQuery: any;

  constructor(private readonly searchService: SearchService, private readonly route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (params['tag']) {
        this.searchQuery = params['tag'];
        await this.loadDocuments(this.searchQuery);
      }
    });
  }

  async onSearchClick() {
    await this.loadDocuments(this.searchQuery);
  }

  async loadDocuments(tag: string) {
    this.posts = await this.searchService.getSearch('posts', tag);
  }
}
