import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/model/shop/shop';

const Url = 'http://localhost:8087/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getShopsByUsername(username: string): Observable<any> {
    return this.http.get(Url + "/username/" + username);
  }

  getShop(id: number): Observable<any>{
    return this.http.get(Url + "/" + id);
  }

  saveShop(shop: Shop):Observable<Shop> {
    return this.http.post<Shop>(Url + '/create/', shop);
  }
}
