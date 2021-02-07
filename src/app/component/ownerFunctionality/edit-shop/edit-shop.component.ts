import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shop } from 'src/app/model/shop/shop';
import { ShopService } from 'src/app/_services/shop/shop.service';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {

  id: number;
  shop: Shop;
  classifications=["open", "closed", "terminated"];
  constructor(private route: ActivatedRoute, protected router: Router, private shopService: ShopService) {
    this.id = this.route.snapshot.params.id;
    this.shop = new Shop();

  }

  ngOnInit(): void {
    this.editShop();
  }

  getAllOrders() {
    this.router.navigate([`/orders/shop/${this.id}`]);
  }

  addNewBook() { 
    this.router.navigate([`/shop/newBook/${this.id}`]);    
  }

  addBook() {
    this.router.navigate([`/shop/addBooks/${this.id}`]);
   }

  shopAssortment() {
    this.router.navigate([`/shop/${this.id}`]);
   }
  editShop() {
    this.shopService.getShop(this.id).subscribe(data => {
      this.shop = data;
      console.log(data);
    });
  }

  onSubmitShop() {
    console.log(this.shop);
    this.shopService.saveShop(this.shop).subscribe();
    window.location.reload();
  }

}
