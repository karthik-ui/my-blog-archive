import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.error = '';
  }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/posts']);
    }
  }

  submit() {
    const { username, password } = this.form.value;
    if (this.auth.login(username!, password!)) {
      this.router.navigate(['/posts']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
