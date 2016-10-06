import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
  selector: 'kvp.detail',
  templateUrl: 'kvp.detail.component.html',
})
export class KvpDetailComponent {
	title = 'detail of detail';
	constructor(
		private location: Location,
		private router: Router) {}
	goBack(): void {
    this.location.back();
  }
  returnTo(): void {
    this.router.navigate(['/kvp']);
  }
}
