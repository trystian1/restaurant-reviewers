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
var RestaurantReviewComponent = (function () {
    function RestaurantReviewComponent(_route, _router, _restaurantsService) {
        this._route = _route;
        this._router = _router;
        this._restaurantsService = _restaurantsService;
        this.pageTitle = 'Create a review for restaurant ';
        this.model = {
            rating: 0,
            review: '',
            reviewer: ''
        };
        this.errorMessage = null;
    }
    ;
    RestaurantReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restaurantId = +this._route.snapshot.params['id'];
        this._restaurantsService.getRestaurants()
            .subscribe(function (restaurants) { return _this.restaurant = restaurants.find(function (restaurant) { return restaurant.id === _this.restaurantId; }); });
    };
    RestaurantReviewComponent.prototype.onBack = function () {
        this._router.navigate(['/home']);
    };
    RestaurantReviewComponent.prototype.onSaveReview = function () {
        if (!this.model.review || !this.model.reviewer || !this.model.rating) {
            this.errorMessage = 'Please fill in all fields';
            return;
        }
        else {
            this.errorMessage = null;
        }
        var _this = this;
        var data = {
            restaurantId: this.restaurantId,
            reviewer: this.model.reviewer,
            review: this.model.review,
            rating: this.model.rating
        };
        this.openDataBase()
            .then(function (db) {
            if (!db)
                return;
            var tx = db.transaction('review', 'readwrite'), store = tx.objectStore('review');
            store.put(data);
            _this._router.navigate(['/reviews/' + _this.restaurantId]);
        });
    };
    RestaurantReviewComponent.prototype.openDataBase = function () {
        return idb['open']('restaurantReviews', 1, function (upgradeDb) {
            var store = upgradeDb.createObjectStore('review', {
                keyPath: 'id',
                autoIncrement: true
            });
            store.createIndex('by-id', 'restaurantId');
        });
    };
    RestaurantReviewComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/create-restaurant-review/create-restaurant-review.component.html',
            styleUrls: ['app/create-restaurant-review/create-restaurant-review.component.css'],
            providers: [restaurants_service_1.RestaurantsService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_2.Router, restaurants_service_1.RestaurantsService])
    ], RestaurantReviewComponent);
    return RestaurantReviewComponent;
}());
exports.RestaurantReviewComponent = RestaurantReviewComponent;
//# sourceMappingURL=create-restaurant-review.component.js.map