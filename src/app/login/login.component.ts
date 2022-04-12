import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;

  userRole = 'user';

  isLoading = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.http.get<any>('http://localhost:3000/users').subscribe({
          next: (res) => {
            const user = res.find((a: any) => {
              return (
                a.email === this.loginForm.value.email &&
                a.password === this.loginForm.value.password &&
                a.role === this.userRole
              );
            });
            console.log(user)
            if (user) {
              this.isLoading = false;
              // alert('Login user succesful');
              this.loginForm.reset();
              this.router.navigate(['user']);
            } else {
              this.isLoading = false;
              // alert('Login admin succesful');
              this.loginForm.reset();
              this.router.navigate(['admin']);
            }
          },
          error: (err) => {
            alert('Somethin went wrong');
            this.isLoading = false;
          },
        });
      }, 3000);
    }
  }
}
