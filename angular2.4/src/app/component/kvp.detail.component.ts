import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { KvpHttpService } from '../service/kvp.http.service';

@Component({
	moduleId: module.id,
  selector: 'kvp.detail',
  templateUrl: 'kvp.detail.component.html',
})
export class KvpDetailComponent {
	title = 'detail of detail';
	key = '';
  firstName = 'Daniel';
  lastName = 'Liu';
  MyExpression = true;

  cnumber = '20171206';
  employer = true;
  company = 'dsdssd'

	constructor(
		private kvpHttpService: KvpHttpService, 
		private location: Location,
		private router: Router) {}
	goBack(): void {
    this.location.back();
  }
  returnTo(): void {
    this.router.navigate(['/kvp']);
  }
  getUsers(): void {
  	this.kvpHttpService.getUsers().then(kv => {
  		this.key = kv[0].key + kv[1].key
  	});
  }
}
