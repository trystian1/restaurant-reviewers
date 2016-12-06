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
var restaurants_service_1 = require('./restaurants.service');
var RestaurantsComponent = (function () {
    function RestaurantsComponent(_restaurantsService) {
        this._restaurantsService = _restaurantsService;
        this.filterOnType = "";
    }
    RestaurantsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._restaurantsService.getRestaurants()
            .subscribe(function (restaurants) { return _this.restaurants = restaurants; }, function (error) { return _this.errorMessage = error; });
    };
    RestaurantsComponent.prototype.resetFilter = function () {
        this.filterOnType = null;
        this.filterOnName = null;
    };
    RestaurantsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'restaurants.component.html',
            styleUrls: ['restaurants.component.css']
        }), 
        __metadata('design:paramtypes', [restaurants_service_1.RestaurantsService])
    ], RestaurantsComponent);
    return RestaurantsComponent;
}());
exports.RestaurantsComponent = RestaurantsComponent;
//# sourceMappingURL=restaurants.component.js.map