import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { KvPair as Kvp} from '../../app/component/kvp.component';
import { KvpHttpService } from '../../app/service/kvp.http.service';

const makeKvpData = () => [
  { key: '1', value: 'Windstorm' },
  { key: '2', value: 'Bombasto' },
  { key: '3', value: 'Magneta' },
  { key: '4', value: 'Tornado' }
] as Kvp[];

////////  Tests  /////////////
describe('Kvp-KvpHttpService (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        KvpHttpService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([KvpHttpService], (service: KvpHttpService) => {
      expect(service instanceof KvpHttpService).toBe(true);
  }));



  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new KvpHttpService(http);
    expect(service instanceof KvpHttpService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

  describe('when getUsers', () => {
      let backend: MockBackend;
      let service: KvpHttpService;
      let fakeKvps: Kvp[];
      let response: Response;

      beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new KvpHttpService(http);
        fakeKvps = makeKvpData();
        let options = new ResponseOptions({status: 200, body: {data: fakeKvps}});
        response = new Response(options);
      }));

      it('should have expected fake Kvps (then)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getUsers()
          .then(users => {
            expect(users.length).toBe(fakeKvps.length,
              'should have expected no. of users');
          });
      })));

      it('should have expected fake kvps (Observable.do)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getUsers().then(users => {
            expect(users.length).toBe(fakeKvps.length,
              'should have expected no. of users');
          });
      })));


      it('should be OK returning no users', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getUsers()
          .then(users => {
            expect(users.length).toBe(0, 'should have no users');
          });
      })));

      it('should treat 404 as an Observable error', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 404}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getUsers()
          .then(users => {
            fail('should not respond with users');
          })
          .catch(err => {
            expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
            return Observable.of(null); // failure is the expected test result
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