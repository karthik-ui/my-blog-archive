import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get method', () => {
    it('should make GET request without params', () => {
      const mockResponse = [{ id: 1, name: 'Test' }];

      service.get('/test').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/test');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should make GET request with params', () => {
      const mockResponse = [{ id: 1, name: 'Test' }];
      const params = { page: 1, limit: 10 };

      service.get('/test', params).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/test?page=1&limit=10');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('post method', () => {
    it('should make POST request', () => {
      const mockResponse = { id: 1, name: 'Test' };
      const body = { name: 'Test' };

      service.post('/test', body).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/test');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush(mockResponse);
    });
  });
});