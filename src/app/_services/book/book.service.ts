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
    console.log(params);
    return this.http.get<any>(bookUrl, { params });
  }

  getOne(id: number): Observable<any> {
    return this.http.get(bookUrl + id);
  }

  getPrice(id: number): Observable<any> {
    return this.http.get("http://localhost:8087/assortment/price/" + id);
  }

  getShop(id: number): Observable<any>{
    return this.http.get("http://localhost:8087/shop/book/" + id);
  }
  getShopPrice(bookId: number, shopId: number): Observable<any>{
    console.log("oiuiyutvyrctexrwz")
    return this.http.get("http://localhost:8087/assortment/price/" + bookId + "/" + shopId);
  }
}
