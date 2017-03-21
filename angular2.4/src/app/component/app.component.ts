import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kvp-app',
  template: `
  	<h2 highlight="skyblue">KVP</h2>
	<router-outlet></router-outlet>
  `,
})
export class AppComponent{
}