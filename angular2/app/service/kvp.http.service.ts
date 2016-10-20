import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { KvPair } from '../component/kvp.component';

@Injectable()
export class KvpHttpService {

	private headers = new Headers({'Content-Type': 'application/json'});
  private kvpUrl = 'http://localhost:1234/users';  // URL to web api

	constructor(private http: Http) { }

	private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private extractData(res: Response) {
  	console.log(res)
    console.log(res.json())
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json().data || { };
  }

	getUsers(): Promise<KvPair[]> {
    return this.http.get(this.kvpUrl)
               .toPromise()
               .then(response => this.extractData(response) as KvPair[])
               .catch(this.handleError);
  }

}
