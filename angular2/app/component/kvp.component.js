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
var kvp_service_1 = require('../service/kvp.service');
var KvPair = (function () {
    function KvPair() {
    }
    return KvPair;
}());
exports.KvPair = KvPair;
var KvpComponent = (function () {
    function KvpComponent(kvpService, router) {
        var _this = this;
        this.kvpService = kvpService;
        this.router = router;
        this.selectedIndex = -1;
        this.message = '';
        this.kv_xml = '';
        this.newKv = '';
        this.toggle_list = true;
        this.kvs = [];
        this.show_list = function () {
            _this.toggle_list = true;
        };
    }
    KvpComponent.prototype.ngOnInit = function () {
        this.getKvs();
    };
    KvpComponent.prototype.ngAfterViewInit = function () {
        console.log('ngAfterViewInit');
    };
    KvpComponent.prototype.ngAfterViewChecked = function () {
        //console.log('ngAfterViewChecked')
    };
    KvpComponent.prototype.getKvs = function () {
        var _this = this;
        this.kvpService.getKvps().then(function (kvs) { return _this.kvs = kvs; });
    };
    KvpComponent.prototype.onSelect = function (kv, index) {
        this.selectedKv = kv;
        this.selectedIndex = index;
    };
    KvpComponent.prototype.onEnter = function (e) {
        e.keyCode === 13 ? this.onAdd() : '';
    };
    KvpComponent.prototype.onAdd = function () {
        var patt0 = /\w+\s*=\s*\w+/g;
        var patt1 = /(^[a-zA-Z0-9\s*]*$)/g;
        this.message = '';
        if (patt0.test(this.newKv) && patt1.test(this.newKv.replace('=', ''))) {
            var kv = this.newKv.split('=');
            kv[0] = kv[0].trim();
            kv[1] = kv[1].trim();
            this.kvpService.addKvp({ key: kv[0], value: kv[1] });
            this.newKv = '';
        }
        else {
            this.message = 'Invalid key/value pair';
        }
    };
    KvpComponent.prototype.delete = function () {
        this.kvpService.delete(this.selectedIndex);
    };
    KvpComponent.prototype.order_value = function () {
        this.kvpService.order_value();
    };
    KvpComponent.prototype.order_key = function () {
        this.kvpService.order_key();
    };
    KvpComponent.prototype.show_xml = function () {
        var _this = this;
        var kv_xml = "<!DOCTYPE html>\n";
        kv_xml += "<html>\n<body>\n";
        kv_xml += "<select id='kv-list' size='10'>\n";
        this.kvs.map(function (c, i) {
            kv_xml += "<option value='" + c.key + "'";
            kv_xml += _this.selectedIndex === i ? " selected" : "";
            kv_xml += ">" + c.key + '=' + c.value + "</option>\n";
        });
        kv_xml += "</select>";
        kv_xml += "\n</body>\n</html>\n";
        this.kv_xml = kv_xml;
        this.toggle_list = false;
    };
    KvpComponent.prototype.load_json = function () {
        var _this = this;
        this.kvpService.load_json().then(function () { return _this.getKvs(); });
    };
    KvpComponent.prototype.save_json = function () {
        var x = document.createElement('a');
        x.href = 'data:text/json;charset=utf-8,' + JSON.stringify(this.kvpService.getKvps());
        x.style['visibility'] = 'hidden';
        x['download'] = 'kv.json';
        document.body.appendChild(x);
        x.click();
        document.body.removeChild(x);
    };
    KvpComponent.prototype.show_detail = function () {
        this.router.navigate(['/kvp.detail']);
    };
    KvpComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'kvp-app',
            templateUrl: 'kvp.component.html',
        }), 
        __metadata('design:paramtypes', [kvp_service_1.KvpService, router_1.Router])
    ], KvpComponent);
    return KvpComponent;
}());
exports.KvpComponent = KvpComponent;
//# sourceMappingURL=kvp.component.js.map