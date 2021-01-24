import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const bookUrl = 'http://localhost:8087/book/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll(searchTitle: string, page: number, pageSize: number, sort: string): Observable<any> {
    let resultUrl;
      resultUrl = bookUrl + `?bookName=${searchTitle}&page=${page}&size=${pageSize}&sort=${sort}`;
      console.log(resultUrl);
      return this.http.get<any>(bookUrl + `?bookName=${searchTitle}&page=${page}&size=${pageSize}&sort=${sort}`);

  }

  getOne(id: number): Observable<any> {
    return this.http.get(bookUrl + id);
  }

  getPrice(id: number): Observable<any> {
    return this.http.get("http://localhost:8087/assortment/price/" + id);
  }

  getShop(id: number): Observable<any> {
    return this.http.get("http://localhost:8087/shop/book/" + id);
  }
  getShopPrice(bookId: number, shopId: number): Observable<any> {
    console.log("oiuiyutvyrctexrwz")
    return this.http.get("http://localhost:8087/assortment/price/" + bookId + "/" + shopId);
  }
}
