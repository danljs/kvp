import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }   from './component/app.component';
import { KvpComponent }   from './component/kvp.component';
import { KvpDetailComponent }   from './component/kvp.detail.component';
import { KvpService}      from './service/kvp.service';
import { KvpHttpService}      from './service/kvp.http.service';
import { HighlightDirective } from './directive/app.highlight.directive';

import { routing } from './routing/kvp.routing';
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing],
  exports:      [ HighlightDirective ],
  declarations: [ AppComponent, KvpComponent, KvpDetailComponent,HighlightDirective],
  providers:   [ KvpService, KvpHttpService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}