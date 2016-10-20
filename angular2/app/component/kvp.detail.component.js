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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var kvp_service_1 = require('../service/kvp.service');
var KvpDetailComponent = (function () {
    function KvpDetailComponent(kvpService, location, router) {
        this.kvpService = kvpService;
        this.location = location;
        this.router = router;
        this.title = 'detail of detail';
        this.key = '';
    }
    KvpDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    KvpDetailComponent.prototype.returnTo = function () {
        this.router.navigate(['/kvp']);
    };
    KvpDetailComponent.prototype.getUsers = function () {
        var _this = this;
        this.kvpService.getUsers().then(function (kv) {
            _this.key = kv[0].key + kv[1].key;
        });
    };
    KvpDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'kvp.detail',
            templateUrl: 'kvp.detail.component.html',
        }), 
        __metadata('design:paramtypes', [kvp_service_1.KvpService, common_1.Location, router_1.Router])
    ], KvpDetailComponent);
    return KvpDetailComponent;
}());
exports.KvpDetailComponent = KvpDetailComponent;
//# sourceMappingURL=kvp.detail.component.js.map