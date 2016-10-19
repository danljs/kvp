"use strict";
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/http/testing');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/operator/toPromise');
var kvp_service_1 = require('../../app/service/kvp.service');
var makeKvpData = function () { return [
    { id: 1, name: 'Windstorm' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Magneta' },
    { id: 4, name: 'Tornado' }
]; };
////////  Tests  /////////////
describe('Kvp-KvpService (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                kvp_service_1.KvpService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        })
            .compileComponents();
    }));
    it('can instantiate service when inject service', testing_1.inject([kvp_service_1.KvpService], function (service) {
        expect(service instanceof kvp_service_1.KvpService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http], function (http) {
        expect(http).not.toBeNull('http should be provided');
        var service = new kvp_service_1.KvpService(http);
        expect(service instanceof kvp_service_1.KvpService).toBe(true, 'new service should be ok');
    }));
    it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
        expect(backend).not.toBeNull('backend should be provided');
    }));
    describe('when getKvps', function () {
        var backend;
        var service;
        var fakeKvps;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new kvp_service_1.KvpService(http);
            fakeKvps = makeKvpData();
            var options = new http_1.ResponseOptions({ status: 200, body: { data: fakeKvps } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake Kvps (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getKvps()
                .then(function (kvps) {
                expect(kvps.length).toBe(fakeKvps.length, 'should have expected no. of kvps');
            });
        })));
        it('should have expected fake kvps (Observable.do)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getKvps().then(function (kvps) {
                expect(kvps.length).toBe(fakeKvps.length, 'should have expected no. of kvps');
            });
        })));
        it('should be OK returning no kvps', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { data: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getKvps()
                .then(function (kvps) {
                expect(kvps.length).toBe(0, 'should have no kvps');
            });
        })));
        it('should treat 404 as an Observable error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getKvps()
                .then(function (kvps) {
                fail('should not respond with kvps');
            })
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Observable_1.Observable.of(null); // failure is the expected test result
            });
        })));
    });
});
//# sourceMappingURL=kvp.service.spec.js.map