
import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { IRestaurant } from './restaurant';
import './restaurants.component.css';

@Component({
  templateUrl: 'restaurants.component.html',
})

export class RestaurantsComponent implements OnInit {

  restaurants: IRestaurant[];
  filterOnName: string;
  filterOnType: string = "";
  httpItems: Array<[Object]>;
  errorMessage: string;

  constructor(private _restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this._restaurantsService.getRestaurants()
      .subscribe(
        restaurants => this.restaurants = restaurants,
        error => this.errorMessage = <any>error
      )

  }

  resetFilter(): void {
    this.filterOnType = null;
    this.filterOnName = null;
  }

}
