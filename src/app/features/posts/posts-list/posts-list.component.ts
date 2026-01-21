import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';
import { trackById } from 'src/app/shared/utils/track-by';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  private postsService = inject(PostsService);
  posts$ = this.postsService.posts$;
  page = 1;

  trackBy = trackById;

  next() {
    this.page++;
    this.postsService.load(this.page);
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.postsService.load(this.page);
    }
  }

  ngOnInit() {
    this.postsService.load(this.page);
  }
}