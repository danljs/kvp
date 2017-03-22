import { Component } from '@angular/core';

@Component({
  selector: 'treeview',
  template: `
  	<div class='tree-view'>
      <div class='item {{itemClassName}}' (click)='toggle()'>
        <div class="{{className}} arrow" [NgClass]= "{'collapsed' : collapsed}"/>
        <ng-content select="nodeLabel"></ng-content>
      </div>
      <div class="children" [NgClass]="{'collapsed' : collapsed}">
        <ng-content *ngIf="!collapsed" select="children"></ng-content>
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