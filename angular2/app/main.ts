import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './kvp.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
