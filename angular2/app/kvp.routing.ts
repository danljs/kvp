import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KvpDetailComponent } from './kvp.detail.component';
import { KvpComponent } from './kvp.component';

const kvpRoutes: Routes = [
	{
    path: '',
    component: KvpComponent
  },
  {
    path: 'kvp',
    component: KvpComponent
  },
  {
    path: 'kvp.detail',
    component: KvpDetailComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(kvpRoutes);