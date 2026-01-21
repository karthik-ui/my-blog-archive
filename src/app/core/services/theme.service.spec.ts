/*import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { createSpy, spyOn } from '../../shared/utils/jasmine-helpers';

describe('ThemeService', () => {
  let service: ThemeService;
  let originalGetItem: any;
  let originalSetItem: any;
  let getItemMock: any;
  let setItemMock: any;

  beforeEach(() => {
    originalGetItem = window.localStorage.getItem;
    originalSetItem = window.localStorage.setItem;
    getItemMock = createSpy('getItem').and.returnValue(null);
    setItemMock = createSpy('setItem').and.stub();
    window.localStorage.getItem = getItemMock;
    window.localStorage.setItem = setItemMock;

    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    window.localStorage.getItem = originalGetItem;
    window.localStorage.setItem = originalSetItem;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialization', () => {
    it('should load light theme by default', () => {
      getItemMock.and.returnValue(null);
      const newService = TestBed.inject(ThemeService);
      expect(newService.theme()).toBe('light');
    });

    it('should load dark theme from localStorage', () => {
      getItemMock.and.returnValue('dark');
      const newService = TestBed.inject(ThemeService);
      expect(newService.theme()).toBe('dark');
    });

    it('should load light theme for invalid localStorage value', () => {
      getItemMock.and.returnValue('invalid');
      const newService = TestBed.inject(ThemeService);
      expect(newService.theme()).toBe('light');
    });
  });

  describe('toggle method', () => {
    it('should toggle from light to dark', () => {
      getItemMock.and.returnValue('light');
      const newService = TestBed.inject(ThemeService);

      newService.toggle();
      expect(newService.theme()).toBe('dark');
      expect(setItemMock).toHaveBeenCalledWith('theme_pref', 'dark');
    });

    it('should toggle from dark to light', () => {
      getItemMock.and.returnValue('dark');
      const newService = TestBed.inject(ThemeService);

      newService.toggle();
      expect(newService.theme()).toBe('light');
      expect(setItemMock).toHaveBeenCalledWith('theme_pref', 'light');
    });
  });

  describe('theme signal and effect', () => {
    it('should set data-theme attribute on document', () => {
      const originalSetAttribute = document.documentElement.setAttribute;
      const setAttributeSpy = createSpy('setAttribute');
      document.documentElement.setAttribute = setAttributeSpy;

      getItemMock.and.returnValue('light');
      const newService = TestBed.inject(ThemeService);

      expect(setAttributeSpy).toHaveBeenCalledWith('data-theme', 'light');
      expect(setItemMock).toHaveBeenCalledWith('theme_pref', 'light');
      document.documentElement.setAttribute = originalSetAttribute;
    });

    it('should update theme when signal changes', () => {
      const originalSetAttribute2 = document.documentElement.setAttribute;
      const setAttributeSpy2 = createSpy('setAttribute');
      document.documentElement.setAttribute = setAttributeSpy2;

      getItemMock.and.returnValue('light');
      const newService = TestBed.inject(ThemeService);

      newService.theme.set('dark');

      expect(setAttributeSpy2).toHaveBeenCalledWith('data-theme', 'dark');
      expect(setItemMock).toHaveBeenCalledWith('theme_pref', 'dark');
      document.documentElement.setAttribute = originalSetAttribute2;
    });
  });
});*/