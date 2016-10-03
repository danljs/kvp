import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { KvpComponent }   from './kvp.component';
import { KvpDetailComponent }   from './kvp.detail.component';
import { routing } from './kvp.routing';
@NgModule({
  imports:      [ BrowserModule, FormsModule, routing],
  declarations: [ KvpComponent, KvpDetailComponent],
  bootstrap:    [ KvpComponent ],
})
export class AppModule {

}
