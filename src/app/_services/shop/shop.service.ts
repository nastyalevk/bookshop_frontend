import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/model/shop/shop';

const API_URL = 'http://localhost:8087/';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getShopsByUsername(username: string): Observable<any> {
    return this.http.get(API_URL + "shop/username/" + username);
  }

  getShop(id: number): Observable<any>{
    return this.http.get(API_URL + "shop/" + id);
  }

  saveShop(shop: Shop):Observable<Shop> {
    return this.http.post<Shop>(API_URL + 'shop/create/', shop);
  }
}
