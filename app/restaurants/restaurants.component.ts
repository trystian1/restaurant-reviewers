
import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { IRestaurant } from './restaurant';

@Component({
  moduleId: module.id,
  templateUrl: 'restaurants.component.html',
  styleUrls: ['restaurants.component.css']
})

export class RestaurantsComponent implements OnInit {

  restaurants: IRestaurant[];
  filterOnName: string;
  filterOnType = "";
  httpItems;
  errorMessage;

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
