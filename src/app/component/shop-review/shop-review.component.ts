import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopReview } from 'src/app/model/review/shop/shop-review';
import { Shop } from 'src/app/model/shop/shop';
import { ReviewService } from 'src/app/_services/review/review.service';
import { ShopService } from 'src/app/_services/shop/shop.service';
import { TokenStorageService } from 'src/app/_services/token/token-storage.service';

@Component({
  selector: 'app-shop-review',
  templateUrl: './shop-review.component.html',
  styleUrls: ['./shop-review.component.css']
})
export class ShopReviewComponent implements OnInit {
  shopId: number;
  shop: Shop;
  isClient = false;
  private roles: string[] = [];

  reviews: ShopReview[]=[];
  review: ShopReview;
  constructor(private route: ActivatedRoute, protected router: Router, private reviewService: ReviewService,
    private shopService: ShopService, private tokenStorageService: TokenStorageService) {
      this.shopId = this.route.snapshot.params.shopId;
      this.shop = new Shop();
      this.roles = this.tokenStorageService.getUser().roles;
      this.isClient = this.roles.includes('ROLE_CLIENT');
      this.review = new ShopReview();
      this.review.rating = 0;
    }

  ngOnInit(): void {
    this.shopService.getShop(this.shopId).subscribe(data => {
      console.log(this.shop);
      this.shop = data;
    });
    this.reviewService.getShopReview(this.shopId).subscribe(data=>{
      this.reviews = data;
    });
  }
  goToLogin() {
    this.router.navigate([`/login`]);
  }

  goToShopAssortment() {
    this.router.navigate([`/shop/page/${this.shopId}/`]);
  }
  saveComment(){
    this.review.shopId = this.shopId;
    console.log(this.review)
    this.reviewService.saveShopReview(this.review).subscribe();
    window.location.reload();
  }
}
