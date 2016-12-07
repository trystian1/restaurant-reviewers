import { Component } from '@angular/core';
import { RestaurantsService } from './restaurants/restaurants.service';

@Component({
  selector: 'body',
  templateUrl: 'app.component.html',
  providers: [RestaurantsService]
})

export class AppComponent {

}
