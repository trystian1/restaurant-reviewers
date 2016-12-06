import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { IRestaurant } from '../restaurants/restaurant';
import * as idb from 'idb';

@Component({
  moduleId: module.id,
  templateUrl: 'restaurant-reviews.component.html',
  styleUrls: ['restaurant-reviews.component.css'],
  providers: [RestaurantsService]
})

export class RestaurantReviewsComponent implements OnInit {

  reviews;
  restaurant: IRestaurant;
  restaurantId;
  filterOnName: string;
  filterOnType = "";
  httpItems;
  errorMessage;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this.restaurantId = +this._route.snapshot.params['id'];


    this._restaurantsService.getRestaurants()
      .subscribe(
        restaurants => this.restaurant = restaurants.find(restaurant => restaurant.id === this.restaurantId),
        error => this.errorMessage = <any>error
     )
    this.getRestaurantReviews({id: this.restaurantId});

  }

  getRestaurantReviews(data) {

    var _this = this;

    return this.openDatabase().then(db => {
      return db.transaction('review')
        .objectStore('review').index('by-id').getAll();
    }).then(function(response) {

      _this.reviews = response.filter(value => value.restaurantId === _this.restaurantId);

    });
  }

  openDatabase() {

    return idb['open']('restaurantReviews', 1, function(upgradeDb) {

      var store = upgradeDb.createObjectStore('review', {
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
