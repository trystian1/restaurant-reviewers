import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IRestaurant } from './restaurant';

@Injectable()

export class RestaurantsService {

  private _productUrl = 'src/api/restaurants.json';

  constructor(private _http: Http) { }

  getRestaurants(): Observable<IRestaurant[]> {

      return this._http.get(this._productUrl)
        .map((response: Response) => <IRestaurant[]> response.json())
  }


}