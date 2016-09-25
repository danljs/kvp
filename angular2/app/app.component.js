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
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <div class=\"all\">\n\t\t<div class=\"header\">\n\t\t\t<div class=\"label\">Key/Value Pair</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"left-area\"><input id=\"kv-input\" type=\"text\"/></div>\n\t\t\t\t<div class=\"right-area\"><button id=\"add-button\">Add</button></div>\n\t\t\t</div>\n\t\t\t<div class=\"row\" id=\"message\"></div>\n\t\t</div>\n\t\t<hr>\n\t\t<div class=\"body\">\n\t\t\t<div class=\"row label\">Key/Value Pair List</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"left-area\">\n\t\t\t\t\t<select id=\"kv-list\" size=\"10\"></select>\n\t\t\t\t\t<textarea readOnly id=\"kv-xml\"></textarea>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"right-area\">\n\t\t\t\t\t<div class=\"row\"><button id=\"order-value-button\">OrderByValue</button></div>\n\t\t\t\t\t<div class=\"row\"><button id=\"order-key-button\">OrderByKey</button></div>\n\t\t\t\t\t<div class=\"row\"><button id=\"delete-button\">Delete</button></div>\n\t\t\t\t\t<div class=\"row\"><button id=\"show-xml\">ShowXML</button></div>\n\t\t\t\t\t<div class=\"row\"><button id=\"show-list\">ShowList</button></div>\n\t\t\t\t\t<div class=\"row\"><button id=\"load-json\">LoadData</button></div>\n\t\t\t\t\t<div class=\"row\"><button id=\"save-json\">SaveData</button></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map