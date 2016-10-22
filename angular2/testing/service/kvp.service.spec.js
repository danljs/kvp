"use strict";
var testing_1 = require('@angular/core/testing');
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/operator/toPromise');
var kvp_service_1 = require('../../app/service/kvp.service');
////////  Tests  /////////////
describe('Kvp-KvpService (mockBackend)', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                kvp_service_1.KvpService
            ]
        })
            .compileComponents();
    }));
    it('can instantiate service when inject service', testing_1.inject([kvp_service_1.KvpService], function (service) {
        expect(service instanceof kvp_service_1.KvpService).toBe(true);
    }));
    describe('when addKvp', function () {
        var service;
        beforeEach(testing_1.inject([], function () {
            service = new kvp_service_1.KvpService();
        }));
        it('should have expected fake Kvps ', testing_1.async(testing_1.inject([], function () {
            service.getKvps().then(function (users) {
                expect(users.length).toBe(0, 'should not have any users');
                service.addKvp({ key: 'key', value: 'value' });
            });
            service.getKvps().then(function (users) {
                expect(users.length).toBe(1, 'should have expected 1 user');
            });
        })));
    });
});
//# sourceMappingURL=kvp.service.spec.js.map