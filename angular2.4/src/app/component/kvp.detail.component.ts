import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { KvpHttpService } from '../service/kvp.http.service';

@Component({
	moduleId: module.id,
  selector: 'kvp.detail',
  template: `
  <div class="detail">
    <h1>{{title}}</h1>  
    <button (click)="goBack()">Back</button>
    <button (click)="returnTo()">Return</button>
    <button (click)="getUsers()">GetUsers</button>
    <div class="row" id="key">{{key}}</div>
    <div class="row" id="value">{{value}}</div>
    <input [value]="firstName">
    <div>{{firstName}}</div>
    <!--two-way binding-->
    <input [(ngModel)]="lastName">
    <div>{{lastName}}</div>
    <div role="button">asfdas</div>
    <template [ngIf]="MyExpression"><p>...</p></template>
    <p *ngIf="MyExpression">.00.</p>
    <p>CNo:{{cnumber | date}}</p>
    <p>Employer:{{employer?.company}}</p>
    <treeview>
      <span class='node'>Production</span>
      <div class='row'>
        <div className='col-sm-3'>name</div>
        <div className='col-sm-2'>type</div>
        <div className='col-sm-3'>created</div>
        <div className='col-sm-4'>status</div>
      </div>
    </treeview>
  </div>
  `,
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
