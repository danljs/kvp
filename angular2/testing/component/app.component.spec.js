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
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var app_component_1 = require('../../app/component/app.component');
//import { BannerComponent }           from './banner.component';
var router_stubs_1 = require('../routing/router-stubs');
var app_highlight_directive_1 = require('../../app/directive/app.highlight.directive');
var WelcomeStubComponent = (function () {
    function WelcomeStubComponent() {
    }
    WelcomeStubComponent = __decorate([
        core_2.Component({ selector: 'app-welcome', template: '' }), 
        __metadata('design:paramtypes', [])
    ], WelcomeStubComponent);
    return WelcomeStubComponent;
}());
var comp;
var fixture;
describe('AppComponent & TestModule', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent,
                //BannerComponent, WelcomeStubComponent,
                router_stubs_1.RouterLinkStubDirective, router_stubs_1.RouterOutletStubComponent
            ]
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent, router_stubs_1.RouterLinkStubDirective],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
//////// Testing w/ real root module //////
// Tricky because we are disabling the router and its configuration
// Better to use RouterTestingModule
var kvp_module_1 = require('../../app/module/kvp.module');
var kvp_routing_1 = require('../../app/routing/kvp.routing');
describe('AppComponent & AppModule', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [kvp_module_1.AppModule]
        })
            .overrideModule(kvp_module_1.AppModule, {
            remove: {
                imports: [kvp_routing_1.routing]
            },
            add: {
                declarations: [router_stubs_1.RouterLinkStubDirective, router_stubs_1.RouterOutletStubComponent]
            }
        })
            .compileComponents()
            .then(function () {
            fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
            comp = fixture.componentInstance;
        });
    }));
    tests();
});
function tests() {
    var links;
    var linkDes;
    beforeEach(function () {
        // trigger initial data binding
        fixture.detectChanges();
        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement
            .queryAll(platform_browser_1.By.directive(router_stubs_1.RouterLinkStubDirective));
        // get the attached link directive instances using the DebugElement injectors
        links = linkDes
            .map(function (de) { return de.injector.get(router_stubs_1.RouterLinkStubDirective); });
    });
    it('can instantiate it', function () {
        expect(comp).not.toBeNull();
    });
    // it('can get RouterLinks from template', () => {
    //   expect(links.length).toBe(3, 'should have 3 links');
    //   expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
    //   expect(links[1].linkParams).toBe('/heroes', '1st link should go to Heroes');
    // });
    // it('can click Heroes link in template', () => {
    //   const heroesLinkDe = linkDes[1];
    //   const heroesLink = links[1];
    //   expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');
    //   heroesLinkDe.triggerEventHandler('click', null);
    //   fixture.detectChanges();
    //   expect(heroesLink.navigatedTo).toBe('/heroes');
    // });
}
describe('AppComponent (highlightDirective)', function () {
    beforeEach(function () {
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent, app_highlight_directive_1.HighlightDirective],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
            .createComponent(app_component_1.AppComponent);
        fixture.detectChanges(); // initial binding
    });
    it('should have skyblue <h2>', function () {
        var de = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        expect(de.styles['backgroundColor']).toBe('skyblue');
    });
});
//# sourceMappingURL=app.component.spec.js.map