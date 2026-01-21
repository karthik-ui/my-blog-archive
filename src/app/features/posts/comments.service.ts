import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  constructor(private api: ApiService) {}

  load(postId: number): Observable<any[]> {
    return this.api.get<any[]>(`/posts/${postId}/comments`);
  }

  add(comment: any): Observable<any> {
    return this.api.post<any>('/comments', comment);
  }

}