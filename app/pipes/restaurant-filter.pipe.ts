import {IRestaurant } from '../restaurants/restaurant';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'restaurantFilter'
})

export class RestaurantFilterPipe implements PipeTransform {

    transform(value: IRestaurant[], filterBy: string): IRestaurant[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((product: IRestaurant) =>
            product.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;

    }
}