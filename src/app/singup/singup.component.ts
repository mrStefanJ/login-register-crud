import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  singUpForm!: FormGroup;
  mainRole: string[] = ['user', 'admin'];
  submitted = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.singUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  get f() {
    return this.singUpForm.controls;
  }

  singUp(){
    this.submitted = true;
    if(this.singUpForm.valid) {
      this.userService.addUser(this.singUpForm.value)
        .subscribe({
          next: (res) => {
            if(res) {
              console.dir(res); 
                this.singUpForm.reset();
                this.router.navigate(['login']);
            } else {
              this.singUpForm.reset();
              this.router.navigate(['singup']);
            }
          },
          error: (err) => {
            console.log('Error')
          }
        })
    }
  }

}
