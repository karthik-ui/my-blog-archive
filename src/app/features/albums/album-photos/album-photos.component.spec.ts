import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AlbumPhotosComponent } from './album-photos.component';
import { AlbumsService } from '../albums.service';
import { of } from 'rxjs';

describe('AlbumPhotosComponent', () => {
  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    const mockAlbumsService = {
      getPhotos: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [AlbumPhotosComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AlbumsService, useValue: mockAlbumsService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AlbumPhotosComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(AlbumPhotosComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});