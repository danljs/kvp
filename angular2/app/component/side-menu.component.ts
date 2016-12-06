import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class SideMenuComponent {

  constructor(route: ActivatedRoute) {

      route.params.subscribe(params => console.log("side menu id parameter",params['id']));

  }
}