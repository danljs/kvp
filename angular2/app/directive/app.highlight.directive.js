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
var HighlightDirective = (function () {
    function HighlightDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
        this.defaultColor = 'rgb(211, 211, 211)'; // lightgray
        renderer.setElementProperty(el.nativeElement, 'customProperty', true);
    }
    HighlightDirective.prototype.ngOnChanges = function () {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', this.bgColor || this.defaultColor);
    };
    __decorate([
        // lightgray
        core_1.Input('highlight'), 
        __metadata('design:type', String)
    ], HighlightDirective.prototype, "bgColor", void 0);
    HighlightDirective = __decorate([
        core_1.Directive({ selector: '[highlight]' }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], HighlightDirective);
    return HighlightDirective;
}());
exports.HighlightDirective = HighlightDirective;
//# sourceMappingURL=app.highlight.directive.js.map