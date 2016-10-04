import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'kvp.detail',
  template: `
  	<div class="detail">
		<h1>{{title}}</h1>	
		<button (click)="goBack()">Back</button>
	</div>
  `,
})
export class KvpDetailComponent {
	title = 'detail of detail';
	constructor(private location: Location) {}
	goBack(): void {
    this.location.back();
  }
}
