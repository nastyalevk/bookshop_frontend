import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../model/book/book';
import { User } from 'src/app/model/user/user';

const API_URL = 'http://localhost:8087/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    
   }

  getPublicContent(): Observable<any> {
    return this.http.get<Book[]>(API_URL + 'book');
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'client', { responseType: 'text' });
  }

  getOwnerBoard(): Observable<any> {
    return this.http.get(API_URL + 'own', { responseType: 'text' });
  }

  findAll(): Observable<User[]> {
    const users = this.http.get<User[]>(API_URL + 'user');
    return users;
  }
  getOne(id: number): Observable<any> {
    return this.http.get(API_URL + 'user/' + id);
  }

  save(user: User) {
    console.log(user);
    return this.http.post<User>(API_URL + 'user/create/', user);
  }

  updateRoles(params: any) {
    return this.http.get<any>(API_URL + 'user/update-roles/', { params });
  }

  getUserByUsername(username: string): Observable<number> {
    return this.http.get<number>(API_URL + 'user/username/' + username);
  }
}