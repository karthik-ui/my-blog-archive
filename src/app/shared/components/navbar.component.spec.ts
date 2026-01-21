import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../features/auth/auth.service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    const mockAuthService = {
      user$: of(null),
      currentUser: null
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should get user initials when user exists', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    // Mock user
    const mockAuthService = TestBed.inject(AuthService);
    (mockAuthService as any).currentUser = {
      firstName: 'John',
      lastName: 'Doe'
    };

    const initials = component.getUserInitials();
    expect(initials).toBe('JD');
  });

  it('should return empty string when no user', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    const mockAuthService = TestBed.inject(AuthService);
    (mockAuthService as any).currentUser = null;

    const initials = component.getUserInitials();
    expect(initials).toBe('');
  });
});