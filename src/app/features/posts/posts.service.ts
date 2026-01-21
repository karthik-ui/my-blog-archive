import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private _posts$ = new BehaviorSubject<any[]>([]);
  posts$ = this._posts$.asObservable();

  constructor(private api: ApiService) {}

  load(page: number = 1) {
    const start = (page - 1) * 10;
    this.api.get<any[]>('/posts', { _start: start, _limit: 10 }).subscribe(posts => {
      this._posts$.next(posts);
    });
  }

  getById(id: number) {
    return this.api.get<any>(`/posts/${id}`);
  }
}