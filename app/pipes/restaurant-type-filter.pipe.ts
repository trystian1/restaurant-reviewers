import {IRestaurant } from '../restaurants/restaurant';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'restaurantTypeFilter'
})

export class RestaurantTypeFilter implements PipeTransform {

    transform(value: IRestaurant[], filterBy: string): IRestaurant[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((restaurant: IRestaurant) =>
            restaurant.cuisine.toLocaleLowerCase() === filterBy) : value;

    }
}