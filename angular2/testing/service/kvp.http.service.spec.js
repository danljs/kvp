"use strict";
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/http/testing');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/operator/toPromise');
var kvp_http_service_1 = require('../../app/service/kvp.http.service');
var makeKvpData = function () { return [
    { key: '1', value: 'Windstorm' },
    { key: '2', value: 'Bombasto' },
    { key: '3', value: 'Magneta' },
    { key: '4', value: 'Tornado' }
]; };
////////  Tests  /////////////
describe('Kvp-KvpHttpService (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                kvp_http_service_1.KvpHttpService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        })
            .compileComponents();
    }));
    it('can instantiate service when inject service', testing_1.inject([kvp_http_service_1.KvpHttpService], function (service) {
        expect(service instanceof kvp_http_service_1.KvpHttpService).toBe(true);
    }));
    it('can instantiate service with "new"', testing_1.inject([http_1.Http], function (http) {
        expect(http).not.toBeNull('http should be provided');
        var service = new kvp_http_service_1.KvpHttpService(http);
        expect(service instanceof kvp_http_service_1.KvpHttpService).toBe(true, 'new service should be ok');
    }));
    it('can provide the mockBackend as XHRBackend', testing_1.inject([http_1.XHRBackend], function (backend) {
        expect(backend).not.toBeNull('backend should be provided');
    }));
    describe('when getUsers', function () {
        var backend;
        var service;
        var fakeKvps;
        var response;
        beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (http, be) {
            backend = be;
            service = new kvp_http_service_1.KvpHttpService(http);
            fakeKvps = makeKvpData();
            var options = new http_1.ResponseOptions({ status: 200, body: { data: fakeKvps } });
            response = new http_1.Response(options);
        }));
        it('should have expected fake Kvps (then)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getUsers()
                .then(function (users) {
                expect(users.length).toBe(fakeKvps.length, 'should have expected no. of users');
            });
        })));
        it('should have expected fake kvps (Observable.do)', testing_1.async(testing_1.inject([], function () {
            backend.connections.subscribe(function (c) { return c.mockRespond(response); });
            service.getUsers().then(function (users) {
                expect(users.length).toBe(fakeKvps.length, 'should have expected no. of users');
            });
        })));
        it('should be OK returning no users', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 200, body: { data: [] } }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getUsers()
                .then(function (users) {
                expect(users.length).toBe(0, 'should have no users');
            });
        })));
        it('should treat 404 as an Observable error', testing_1.async(testing_1.inject([], function () {
            var resp = new http_1.Response(new http_1.ResponseOptions({ status: 404 }));
            backend.connections.subscribe(function (c) { return c.mockRespond(resp); });
            service.getUsers()
                .then(function (users) {
                fail('should not respond with users');
            })
                .catch(function (err) {
                expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                return Observable_1.Observable.of(null); // failure is the expected test result
            });
        })));
    });
    // describe('when addKvp', () => {
    //     let backend: MockBackend;
    //     let service: KvpHttpService;
    //     let fakeKvps: Kvp[];
    //     let response: Response;
    //     beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
    //       backend = be;
    //       service = new KvpHttpService(http);
    //       fakeKvps = makeKvpData();
    //       let options = new ResponseOptions({status: 200, body: {data: fakeKvps}});
    //       response = new Response(options);
    //     }));
    //     it('should have expected fake Kvps (then)', async(inject([], () => {
    //       backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
    //       service.getUsers()
    //         .then(users => {
    //           expect(users.length).toBe(fakeKvps.length,
    //             'should have expected no. of users');
    //         });
    //     })));
    // });
});
//# sourceMappingURL=kvp.http.service.spec.js.map