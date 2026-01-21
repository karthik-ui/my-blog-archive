import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlbumsService } from '../albums.service';
import { trackById } from 'src/app/shared/utils/track-by';

@Component({
  selector: 'app-albums-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums-grid.component.html',
})
export class AlbumsGridComponent {
  private albumsService = inject(AlbumsService);
  albums: any[] = [];
  trackBy = trackById;

  ngOnInit() {
    this.albumsService.getAlbums().subscribe(albums => (this.albums = albums));
  }
}