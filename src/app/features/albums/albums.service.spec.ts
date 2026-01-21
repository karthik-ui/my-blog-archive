import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AlbumsService } from './albums.service';
import { ApiService } from '../../core/services/api.service';
import { createSpy } from '../../shared/utils/jasmine-helpers';

describe('AlbumsService', () => {
  let service: AlbumsService;
  let apiServiceSpy: { get: jasmine.Spy };

  beforeEach(() => {
    apiServiceSpy = { get: createSpy('get') };

    TestBed.configureTestingModule({
      providers: [
        AlbumsService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });

    service = TestBed.inject(AlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAlbums', () => {
    it('should call api.get with correct path', () => {
      const mockAlbums = [{ id: 1, title: 'Test Album' }];
      (apiServiceSpy.get as jasmine.Spy).and.returnValue(of(mockAlbums));

      let result: any;
      service.getAlbums().subscribe((res: any) => {
        result = res;
      });

      expect(apiServiceSpy.get).toHaveBeenCalledWith('/albums');
      expect(result).toEqual(mockAlbums);
    });
  });

  describe('getPhotos', () => {
    it('should call api.get with correct path and default params', () => {
      const mockPhotos = [{ id: 1, title: 'Test Photo' }];
      (apiServiceSpy.get as jasmine.Spy).and.returnValue(of(mockPhotos));

      let result: any;
      service.getPhotos(1).subscribe((res: any) => {
        result = res;
      });

      expect(apiServiceSpy.get).toHaveBeenCalledWith('/photos', { albumId: 1, _start: 0, _limit: 10 });
      expect(result).toEqual(mockPhotos);
    });

    it('should call api.get with correct path and custom params', () => {
      const mockPhotos = [{ id: 1, title: 'Test Photo' }];
      (apiServiceSpy.get as jasmine.Spy).and.returnValue(of(mockPhotos));

      let result: any;
      service.getPhotos(1, 2, 20).subscribe((res: any) => {
        result = res;
      });

      expect(apiServiceSpy.get).toHaveBeenCalledWith('/photos', { albumId: 1, _start: 20, _limit: 20 });
      expect(result).toEqual(mockPhotos);
    });
  });
});