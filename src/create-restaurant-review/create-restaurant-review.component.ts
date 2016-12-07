import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { IRestaurant } from '../restaurants/restaurant';
import * as idb from 'idb';
import './create-restaurant-review.component.css';

@Component({
  templateUrl: 'create-restaurant-review.component.html',
  providers: [RestaurantsService]
})

export class RestaurantReviewComponent implements OnInit {
  pageTitle: string = 'Create a review for restaurant ';
  model: Object = {
    rating: 0,
    review: '',
    reviewer: ''
  };
  errorMessage: string;
  restaurantId: number;
  restaurant: IRestaurant;
  _this: this;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _restaurantsService: RestaurantsService) {};

  ngOnInit(): void {

    this.restaurantId = +this._route.snapshot.params['id'];
    this._restaurantsService.getRestaurants()
      .subscribe(
        restaurants => this.restaurant = restaurants.find(restaurant => restaurant.id === this.restaurantId)
      )

  }

  onBack(): void {
    this._router.navigate(['/home']);
  }

  onSaveReview(): void {
    if (!this.model['review'] || !this.model['reviewer'] || !this.model['rating']) {
      this.errorMessage = 'Please fill in all fields'
      return;
    } else {
      this.errorMessage = null;
    }

    let _this = this;
    let data = {
      restaurantId: this.restaurantId,
      reviewer: this.model['reviewer'],
      review: this.model['review'],
      rating: this.model['rating']
    }

    this.openDataBase()
      .then(function(db: Object) {
        if (!db) return;

        var tx = db['transaction']('review', 'readwrite'),
            store = tx.objectStore('review');

         store.put(data);
         _this._router.navigate(['/reviews/' + _this.restaurantId]);
      });


  }

  openDataBase() {

    return idb['open']('restaurantReviews', 1, function(upgradeDb: Object) {

      var store = upgradeDb['createObjectStore']('review', {
        keyPath: 'id',
        autoIncrement: true
      });

      store.createIndex('by-id', 'restaurantId');

    });
  }

}
