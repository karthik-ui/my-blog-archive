import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  beforeEach(async () => {
    const mockAuthService = {
      login: () => Promise.resolve(),
      user$: of(null)
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should initialize the form', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.form).toBeDefined();
    expect(component.form.get('username')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });
});