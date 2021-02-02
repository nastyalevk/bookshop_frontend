import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private tokenStorage: TokenStorageService, private shopService: ShopService,  protected router: Router) { }

  ngOnInit(): void {
    this.shopService.getShopsByUsername(this.tokenStorage.getUser().username).subscribe(data=>{
      this.shops = data
    });
  }

  createShop(){
    this.router.navigate([`new/shop`]);
  }

  goToShopPage(id: number){
    this.router.navigate([`orders/shop/${id}`]);
  }
}
