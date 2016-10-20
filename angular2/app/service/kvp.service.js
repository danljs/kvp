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
require('rxjs/add/operator/toPromise');
var KvpService = (function () {
    function KvpService() {
        this.kvs = [];
    }
    KvpService.prototype.getKvps = function () {
        return Promise.resolve(this.kvs);
    };
    KvpService.prototype.addKvp = function (kvp) {
        this.kvs.push(kvp);
    };
    KvpService.prototype.delete = function (index) {
        this.kvs.splice(index, 1);
    };
    KvpService.prototype.order_value = function () {
        this.kvs.sort(function (a, b) { return a.key < b.key ? -1 : (a.key > b.key ? 1 : 0); });
    };
    KvpService.prototype.order_key = function () {
        this.kvs.sort(function (a, b) { return a.value < b.value ? -1 : (a.value > b.value ? 1 : 0); });
    };
    KvpService.prototype.load_json = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var x = document.createElement('INPUT');
            x.setAttribute('type', 'file');
            document.body.appendChild(x);
            x.style['visibility'] = 'hidden';
            x.addEventListener('change', resolve);
            x.click();
            document.body.removeChild(x);
        })
            .then(function (e) { return new Promise(function (resolve, reject) {
            var file = e['target'].files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = resolve;
            reader.readAsText(file);
        }); }, function () { return console.log('Something wrong...'); })
            .then(function (e) {
            _this.concatKvps(JSON.parse(e['target'].result));
            return Promise.resolve();
        }, function () { return console.log('Something wrong...'); });
    };
    KvpService.prototype.concatKvps = function (kvps) {
        this.kvs = this.kvs.concat(kvps);
    };
    KvpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], KvpService);
    return KvpService;
}());
exports.KvpService = KvpService;
//# sourceMappingURL=kvp.service.js.map