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
var restaurants_service_1 = require('../restaurants/restaurants.service');
var idb = require('idb');
var RestaurantReviewsComponent = (function () {
    function RestaurantReviewsComponent(_router, _route, _restaurantsService) {
        this._router = _router;
        this._route = _route;
        this._restaurantsService = _restaurantsService;
        this.filterOnType = "";
    }
    RestaurantReviewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restaurantId = +this._route.snapshot.params['id'];
        this._restaurantsService.getRestaurants()
            .subscribe(function (restaurants) { return _this.restaurant = restaurants.find(function (restaurant) { return restaurant.id === _this.restaurantId; }); }, function (error) { return _this.errorMessage = error; });
        this.getRestaurantReviews({ id: this.restaurantId });
    };
    RestaurantReviewsComponent.prototype.getRestaurantReviews = function (data) {
        var _this = this;
        return this.openDatabase().then(function (db) {
            return db.transaction('review')
                .objectStore('review').index('by-id').getAll();
        }).then(function (response) {
            _this.reviews = response.filter(function (value) { return value.restaurantId === _this.restaurantId; });
        });
    };
    RestaurantReviewsComponent.prototype.openDatabase = function () {
        return idb['open']('restaurantReviews', 1, function (upgradeDb) {
            var store = upgradeDb.createObjectStore('review', {
                keyPath: 'id',
                autoIncrement: true
            });
            store.createIndex('by-id', 'restaurantId');
        });
    };
    RestaurantReviewsComponent.prototype.resetFilter = function () {
        this.filterOnType = null;
        this.filterOnName = null;
    };
    RestaurantReviewsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'restaurant-reviews.component.html',
            styleUrls: ['restaurant-reviews.component.css'],
            providers: [restaurants_service_1.RestaurantsService]
        }), 
        __metadata('design:paramtypes', [router_2.Router, router_1.ActivatedRoute, restaurants_service_1.RestaurantsService])
    ], RestaurantReviewsComponent);
    return RestaurantReviewsComponent;
}());
exports.RestaurantReviewsComponent = RestaurantReviewsComponent;
//# sourceMappingURL=restaurant-reviews.component.js.map