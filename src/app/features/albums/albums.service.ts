import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  constructor(private api: ApiService) {}

  getAlbums(): Observable<any[]> {
    return this.api.get<any[]>('/albums');
  }

  getPhotos(albumId: number, page: number = 1, limit: number = 10): Observable<any[]> {
    const start = (page - 1) * limit;
    return this.api.get<any[]>(`/photos`, { albumId, _start: start, _limit: limit });
  }
}