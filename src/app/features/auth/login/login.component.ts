import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HlmButton, HlmInput],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form;
  error = '';
  returnUrl = '/posts';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/posts';
  }

  submit() {
    const { username, password } = this.form.value;
    if (this.auth.login(username!, password!)) {
      this.router.navigate([this.returnUrl]);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
