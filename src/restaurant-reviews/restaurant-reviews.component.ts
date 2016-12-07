import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { IRestaurant } from '../restaurants/restaurant';
import { IReview} from './review';
import * as idb from 'idb';
import './restaurant-reviews.component.css';

@Component({
  templateUrl: 'restaurant-reviews.component.html',
  providers: [RestaurantsService]
})

export class RestaurantReviewsComponent implements OnInit {

  reviews: IReview[];
  restaurant: IRestaurant;
  restaurantId: number;
  filterOnName: string;
  filterOnType = "";
  httpItems: Array<[Object]>;
  errorMessage: string;


  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _restaurantsService: RestaurantsService) {}

  ngOnInit() {
    let self = this;
    console.log(this.reviews, this.restaurant);
    this.restaurantId = +this._route.snapshot.params['id'];


    this._restaurantsService.getRestaurants()
      .subscribe(
        restaurants => this.restaurant = restaurants['find'](function(restaurant: IRestaurant) {
          return restaurant.id === self.restaurantId
        }),
        error => this.errorMessage = <any>error
     )
    this.getRestaurantReviews({id: this.restaurantId});

  }

  getRestaurantReviews(data: Object) {

    var _this = this;

    return this.openDatabase().then(function(db:Object) {
      return db['transaction']('review')
        .objectStore('review').index('by-id').getAll();
    }).then(function(response:IReview) {

      _this.reviews = response['filter'](function(value: Object) {
        return value['restaurantId'] === _this.restaurantId;
      });

    });
  }

  openDatabase() {

    return idb['open']('restaurantReviews', 1, function(upgradeDb: Object) {

      var store = upgradeDb['createObjectStore']('review', {
        keyPath: 'id',
        autoIncrement: true
      });

      store.createIndex('by-id', 'restaurantId');

    });

  }

  resetFilter(): void {
    this.filterOnType = null;
    this.filterOnName = null;
  }

}
