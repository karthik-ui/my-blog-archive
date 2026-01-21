import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HlmButton, HlmInput],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  form;
  submitError = '';
  submitSuccess = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator.bind(this)
    });
  }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/posts']);
    }
  }

  /**
   * Validate that passwords match
   */
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (!password || !passwordConfirm) {
      return null;
    }

    return password.value === passwordConfirm.value ? null : { passwordMismatch: true };
  }

  /**
   * Submit signup form
   */
  submit() {
    if (this.form.valid) {
      try {
        const formValue = this.form.value;
        this.auth.signup({
          firstName: (formValue.firstName || '').trim(),
          lastName: (formValue.lastName || '').trim(),
          username: (formValue.username || '').trim(),
          password: formValue.password || '',
        });
        this.submitSuccess = true;
        this.submitError = '';
        
        setTimeout(() => {
          this.router.navigate(['/posts']);
        }, 1500);
      } catch (error) {
        this.submitError = 'Failed to create account. Please try again.';
        this.submitSuccess = false;
      }
    } else {
      this.submitError = 'Please fill in all fields correctly.';
    }
  }

  /**
   * Get form error message
   */
  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.touched) return '';

    if (field.hasError('required')) {
      return `${this.capitalize(fieldName)} is required`;
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength')?.requiredLength;
      return `${this.capitalize(fieldName)} must be at least ${minLength} characters`;
    }
    return '';
  }

  /**
   * Capitalize string
   */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
  }

  /**
   * Check password match error
   */
  get passwordMismatchError(): boolean {
    return this.form.hasError('passwordMismatch') && this.form.touched;
  }
}