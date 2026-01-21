import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumsGridComponent } from './albums-grid.component';
import { AlbumsService } from '../albums.service';
import { of } from 'rxjs';

describe('AlbumsGridComponent', () => {
  beforeEach(async () => {
    const mockAlbumsService = {
      getAlbums: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [AlbumsGridComponent, RouterTestingModule],
      providers: [
        { provide: AlbumsService, useValue: mockAlbumsService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AlbumsGridComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(AlbumsGridComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});