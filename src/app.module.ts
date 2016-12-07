import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantReviewComponent } from './create-restaurant-review/create-restaurant-review.component';
import { RestaurantReviewsComponent} from './restaurant-reviews/restaurant-reviews.component';
import { RestaurantFilterPipe } from './pipes/restaurant-filter.pipe';
import { RestaurantTypeFilter } from './pipes/restaurant-type-filter.pipe';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot([
      {path: 'home', component: RestaurantsComponent},
      {path: 'create/:id', component: RestaurantReviewComponent},
      {path: 'reviews/:id', component: RestaurantReviewsComponent},
      {path: '', component: RestaurantsComponent},
      {path: '**', component: RestaurantsComponent}
    ])],
  declarations: [ AppComponent, RestaurantFilterPipe, RestaurantTypeFilter, RestaurantReviewComponent, RestaurantsComponent, RestaurantReviewsComponent],
  bootstrap:    [ AppComponent]
})

export class AppModule {}
