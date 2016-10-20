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
//# sourceMappingURL=kvp.service.spec.js.map