import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }   from './app.component';
import { KvpComponent }   from './kvp.component';
import { KvpDetailComponent }   from './kvp.detail.component';
import { KvpService}			from './kvp.service';

import { routing } from './kvp.routing';
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing],
  declarations: [ AppComponent, KvpComponent, KvpDetailComponent],
  providers: 	[ KvpService, ],
  bootstrap:    [ AppComponent ],
})
export class AppModule {

}
