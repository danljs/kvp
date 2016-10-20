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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var KvpHttpService = (function () {
    function KvpHttpService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.kvpUrl = 'http://localhost:1234/users'; // URL to web api
    }
    KvpHttpService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    KvpHttpService.prototype.extractData = function (res) {
        console.log(res);
        console.log(res.json());
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        return res.json().data || {};
    };
    KvpHttpService.prototype.getUsers = function () {
        var _this = this;
        return this.http.get(this.kvpUrl)
            .toPromise()
            .then(function (response) { return _this.extractData(response); })
            .catch(this.handleError);
    };
    KvpHttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], KvpHttpService);
    return KvpHttpService;
}());
exports.KvpHttpService = KvpHttpService;
//# sourceMappingURL=kvp.http.service.js.map