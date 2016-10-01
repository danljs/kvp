import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KvpComponent } from './kvp.component';

const appRoutes: Routes = [
  {
    path: 'kvp',
    component: KvpComponent
  }
];