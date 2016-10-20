import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { KvPair } from '../component/kvp.component';

@Injectable()
export class KvpService {
	kvs = []
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

  getKvps(): Promise<KvPair[]>{
    return Promise.resolve(this.kvs);
  }
  addKvp(kvp): void{
  	this.kvs.push(kvp);
  }
  delete(index): void {
		this.kvs.splice(index, 1)
	}
	order_value(): void {
		this.kvs.sort((a, b) => a.key < b.key ? -1 : (a.key > b.key ? 1 : 0))
	}
	order_key(): void {
		this.kvs.sort((a, b) => a.value < b.value ? -1 : (a.value > b.value ? 1 : 0))
	}
	load_json(): Promise<void>{
		return new Promise((resolve, reject) => {
			let x = document.createElement('INPUT')
	    x.setAttribute('type', 'file')
	    document.body.appendChild(x)
	    x.style['visibility'] = 'hidden';
	    x.addEventListener('change', resolve)
	    x.click()
	    document.body.removeChild(x)
		})
		.then(
			e => new Promise((resolve, reject) => {
		    let file = e['target'].files[0];
				if(!file){return;}
				let reader = new FileReader();
				reader.onload = resolve;
				reader.readAsText(file);
			}),
    	() => console.log('Something wrong...')
		)
		.then(
			e => {
				this.concatKvps(JSON.parse(e['target'].result))
				return Promise.resolve()
			},
			() => console.log('Something wrong...')
		)
		
	}
	concatKvps(kvps): void{
		this.kvs = this.kvs.concat(kvps)
  }
}
