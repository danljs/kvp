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
  
  describe('when addKvp', () => {
      let service: KvpService;

      beforeEach(inject([], () => {
        service = new KvpService();
      }));

      it('should have expected fake Kvps ', async(inject([], () => {
        service.getKvps().then(users => {
          expect(users.length).toBe(0,'should not have any users');
          service.addKvp({key: 'key', value: 'value'});
        })
        
        service.getKvps().then(users => {
          expect(users.length).toBe(1, 'should have expected 1 user');
        });
      })));

  });
});