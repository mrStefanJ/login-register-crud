import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  URL = 'http://localhost:3000';
  // show all users
  getAllUser() {
    return this.http.get<User[]>(this.URL + '/users');
  }
  // select user by ID
  getUserById(id: number){
    return this.http.get<User>(this.URL + '/users' + id)
  }
  // create new user
  addUser(user: any){
    return this.http.post<any>(this.URL + '/users', user);
  }
  // update user by id
  updateUser(data: any, id: string){
    return this.http.put<any>(this.URL + '/users/' + id, data);
  }
  // delete user by id
  deleteUserById(id: number) {
    return this.http.delete(this.URL + '/users/' + id);
  }
}
