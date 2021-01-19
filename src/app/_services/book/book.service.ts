import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const bookUrl = 'http://localhost:8087/book/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    let result = this.http.get<any>(bookUrl, { params });
    // console.log(result);
    return result;
  }

  getOne(id: number): Observable<any>{
    return this.http.get(bookUrl + id);
  }
}
