import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	moduleId: module.id,
  selector: 'kvp.detail',
  templateUrl: 'kvp.detail.component.html',
})
export class KvpDetailComponent {
	title = 'detail of detail';
	constructor(private location: Location) {}
	goBack(): void {
    this.location.back();
  }
}
