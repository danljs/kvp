import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { KvpComponent }   from './kvp.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ KvpComponent ],
  bootstrap:    [ KvpComponent ]
})
export class AppModule {

}
