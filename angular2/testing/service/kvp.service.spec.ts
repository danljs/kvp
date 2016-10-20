import { async, inject, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { KvPair as Kvp} from '../../app/component/kvp.component';
import { KvpService } from '../../app/service/kvp.service';

////////  Tests  /////////////
describe('Kvp-KvpService (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      providers: [
        KvpService
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([KvpService], (service: KvpService) => {
      expect(service instanceof KvpService).toBe(true);
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