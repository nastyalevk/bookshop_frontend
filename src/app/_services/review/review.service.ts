import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookReview } from 'src/app/model/review/book/book-review';
import { ShopReview } from 'src/app/model/review/shop/shop-review';

const Url = 'http://localhost:8087/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getShopReview(shopId: number): Observable<any>{
    return this.http.get(Url + "/shop/" + shopId);
  }

  getBookReview(bookId: number): Observable<any>{
    return this.http.get(Url + "/book/" + bookId);
  }

  saveBookReview(review: BookReview): Observable<BookReview>{
    return this.http.post<BookReview>(Url+ "/book/create/", review);
  }

  saveShopReview(review: ShopReview): Observable<ShopReview>{
    return this.http.post<ShopReview>(Url+ "/shop/create/", review);
  }
}
