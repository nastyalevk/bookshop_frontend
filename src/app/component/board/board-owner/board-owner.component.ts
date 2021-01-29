import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/model/shop/shop';
import { ShopService } from 'src/app/_services/shop/shop.service';
import { TokenStorageService } from 'src/app/_services/token/token-storage.service';

@Component({
  selector: 'app-board-owner',
  templateUrl: './board-owner.component.html',
  styleUrls: ['./board-owner.component.css']
})
export class BoardOwnerComponent implements OnInit {

  shops: Shop[] = [];
  constructor(private tokenStorage: TokenStorageService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getShopsByUsername(this.tokenStorage.getUser().username).subscribe(data=>{
      this.shops = data
    });
  }

  createShop(){
    
  }
}
