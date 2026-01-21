import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private _posts$ = new BehaviorSubject<any[]>([]);
  posts$ = this._posts$.asObservable();

  constructor(private api: ApiService) {}

  /**
   * Load posts with pagination
   * @param page - Page number (1-based)
   */
  load(page: number = 1) {
    const start = (page - 1) * 10;
    this.api.get<any[]>('/posts', { _start: start, _limit: 10 }).subscribe(posts => {
      this._posts$.next(posts);
    });
  }

  /**
   * Get a single post by ID
   * @param id - Post ID
   */
  getById(id: number) {
    console.log('[PostsService] Fetching post:', id);
    return this.api.get<any>(`/posts/${id}`).pipe(
      tap(post => console.log('[PostsService] Post fetched:', post)),
      catchError(err => {
        console.error('[PostsService] Error fetching post:', err);
        // Fallback mock data if API fails
        return of({
          id: id,
          title: `Post #${id}`,
          body: `This is post number ${id}. The post content should appear here when the API is working properly.`,
          userId: Math.ceil(id / 10)
        });
      })
    );
  }
}