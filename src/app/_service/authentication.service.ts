import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../model/role.model';

import { User } from '../model/user.model';
import { UserComponent } from '../user/user.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>( JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
  }
  // login() {
  //   return this.http.get<any>('http://localhost:3000/users')
  //   .pipe(map(user => {
  //     if(user) {
  //       if(Role.User){
  //         localStorage.setItem('user',JSON.stringify(user));
  //         this.userSubject.next(user);
  //       }else {
  //         localStorage.setItem('admin',JSON.stringify(user));
  //         this.userSubject.next(user);
  //       }

  //       return user;
  //     }
  //   }));
  // }

  login(username: string, password: string) {
    return this.http.post<any>(`/user/authenticate`, {username, password})
      .pipe(map(user => {
        if(user) {
          if(Role.User){
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          } else {
            localStorage.setItem('admin', JSON.stringify(user));
            this.userSubject.next(user);
          }

        }

        return user;
      }))
  }

  logout() {
    if(Role.User){
      localStorage.removeItem('user');
      this.userSubject.next(null!);
      this.router.navigate(['/login']);
    } else {
      localStorage.removeItem('admin');
      this.userSubject.next(null!);
      this.router.navigate(['/login']);
    }
  }
}
