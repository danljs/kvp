import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
import { KvpComponent }   from './kvp.component';
import { KvpDetailComponent }   from './kvp.detail.component';
import { routing } from './kvp.routing';
@NgModule({
  imports:      [ BrowserModule, FormsModule, routing],
  declarations: [ AppComponent, KvpComponent, KvpDetailComponent],
  bootstrap:    [ AppComponent ],
})
export class AppModule {

}
