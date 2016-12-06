"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var RestaurantReviewComponent = (function () {
    function RestaurantReviewComponent(_route, _router, _restaurantsService) {
        this._route = _route;
        this._router = _router;
        this._restaurantsService = _restaurantsService;
        this.pageTitle = 'Restaurant';
    }
    ;
    RestaurantReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restaurantId = +this._route.snapshot.params['id'];
        this._restaurantsService.getRestaurants()
            .subscribe(function (restaurants) { return _this.restaurant = restaurants.find(_this.findRestaurant); });
        console.log(this.restaurant);
    };
    RestaurantReviewComponent.prototype.findRestaurant = function (restaurant) {
        return restaurant.id === this.restaurantId;
    };
    RestaurantReviewComponent.prototype.onBack = function () {
        this._router.navigate(['/home']);
    };
    RestaurantReviewComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/create-restaurant-review/create-restaurant-review.component.html',
            styleUrls: ['app/create-restaurant-review/create-restaurant-review.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_2.Router, Object])
    ], RestaurantReviewComponent);
    return RestaurantReviewComponent;
}());
exports.RestaurantReviewComponent = RestaurantReviewComponent;
//# sourceMappingURL=create-restaurant-review.component.js.map