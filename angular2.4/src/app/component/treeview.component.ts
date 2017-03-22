import { Component, Input} from '@angular/core';

@Component({
  selector: 'treeview',
  template: `
  	<div class='tree-view'>
      <div class='item {{itemClassName}}' (click)='toggle()'>
        <div class="{{className}} arrow" [ngClass]="{'collapsed' : collapsed}"></div>
        <ng-content select=".node"></ng-content>
      </div>
      <div class="children" [ngClass]="{'collapsed' : collapsed}">
        <ng-content *ngIf="!collapsed" select=".row"></ng-content>
      </div>
    </div>
  `
})
export class TreeViewComponent{
	@Input('collapsed') collapsed: boolean;
  @Input('collapsed') defaultCollapsed: boolean;
  @Input('collapsed') className: string;
  @Input('collapsed') itemClassName: string;

  toggle(){
  	this.collapsed = !this.collapsed;
  }
}