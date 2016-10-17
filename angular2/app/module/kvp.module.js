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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
// import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';
var app_component_1 = require('../component/app.component');
var kvp_component_1 = require('../component/kvp.component');
var kvp_detail_component_1 = require('../component/kvp.detail.component');
var kvp_service_1 = require('../service/kvp.service');
var app_highlight_directive_1 = require('../directive/app.highlight.directive');
var kvp_routing_1 = require('../routing/kvp.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, kvp_routing_1.routing],
            exports: [app_highlight_directive_1.HighlightDirective],
            declarations: [app_component_1.AppComponent, kvp_component_1.KvpComponent, kvp_detail_component_1.KvpDetailComponent, app_highlight_directive_1.HighlightDirective],
            providers: [kvp_service_1.KvpService,],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=kvp.module.js.map