import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookReview } from 'src/app/model/review/book/book-review';
import { ReviewService } from 'src/app/_services/review/review.service';

@Component({
  selector: 'app-comment-approve',
  templateUrl: './book-comment-approve.component.html',
  styleUrls: ['./book-comment-approve.component.css']
})
export class BookCommentApproveComponent implements OnInit {

  reviews: ReviewService[] = [];

  constructor(protected router: Router, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewService.getBookReviewAdmin().subscribe(data=>{
      this.reviews = data;
    });
  }

  editUsers() {
    this.router.navigate(['admin']);
  }

  BookApproveComment() {
    this.router.navigate(['admin/book/comments']);
  }
  ShopApproveComment() {
    this.router.navigate(['admin/shop/comments']);
  }

  approveBook(review: BookReview){
    review.approved = true;
    console.log(review);
    this.reviewService.saveBookReview(review).subscribe(()=>{
      this.ngOnInit()
    });
  }
  editComment(reviewId: number, bookId: number){
    this.router.navigate([`review/${reviewId}/book/${bookId}`]);
  }
}
