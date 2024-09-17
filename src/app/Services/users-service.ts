import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${Environment.apiUrl}/Users`;
  
  constructor(private http: HttpClient) { }
 

  getUsers() {
    return this.http.get<any>(this.apiUrl); 
  }

  addUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  deleteUser(id: any) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: any) {
    return this.http.patch<any>(`${this.apiUrl}`, user);
  }
}
