import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../albums.service';
import { trackById } from 'src/app/shared/utils/track-by';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss'],
})
export class AlbumPhotosComponent {
  private route = inject(ActivatedRoute);
  private albumsService = inject(AlbumsService);

  photos: any[] = [];
  page = 1;
  trackBy = trackById;

  ngOnInit() {
    this.load();
  }

  load() {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    this.albumsService.getPhotos(albumId, this.page).subscribe(photos => (this.photos = photos));
  }

  next() {
    this.page++;
    this.load();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}