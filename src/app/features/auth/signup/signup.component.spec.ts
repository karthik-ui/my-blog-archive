import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  beforeEach(async () => {
    const mockAuthService = {
      signup: () => Promise.resolve(),
      user$: of(null)
    };

    await TestBed.configureTestingModule({
      imports: [SignupComponent, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should initialize the form', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.form).toBeDefined();
    expect(component.form.get('firstName')).toBeDefined();
    expect(component.form.get('lastName')).toBeDefined();
    expect(component.form.get('username')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });
});