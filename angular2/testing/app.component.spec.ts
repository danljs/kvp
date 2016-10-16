import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { Component }                 from '@angular/core';
import { AppComponent }              from '../app/app.component';
//import { BannerComponent }           from './banner.component';
import { RouterLinkStubDirective, RouterOutletStubComponent } from './router-stubs';
import { HighlightDirective } from '../app/app.highlight.directive';

@Component({selector: 'app-welcome', template: ''})
class WelcomeStubComponent {}


let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        //BannerComponent, WelcomeStubComponent,
        RouterLinkStubDirective, RouterOutletStubComponent
      ]
    })

    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));
  tests();
});

//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, RouterLinkStubDirective ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })

    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));
  tests();
});

//////// Testing w/ real root module //////
// Tricky because we are disabling the router and its configuration
// Better to use RouterTestingModule
import { AppModule }    from '../app/kvp.module';
import { routing } from '../app/kvp.routing';

describe('AppComponent & AppModule', () => {

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })

    // Get rid of app's Router configuration otherwise many failures.
    // Doing so removes Router declarations; add the Router stubs
    .overrideModule(AppModule, {
      remove: {
        imports: [ routing ]
      },
      add: {
        declarations: [ RouterLinkStubDirective, RouterOutletStubComponent ]
      }
    })

    .compileComponents()

    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));

  tests();
});

function tests() {
  let links: RouterLinkStubDirective[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    // trigger initial data binding
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('can instantiate it', () => {
    expect(comp).not.toBeNull();
  });

  // it('can get RouterLinks from template', () => {
  //   expect(links.length).toBe(3, 'should have 3 links');
  //   expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
  //   expect(links[1].linkParams).toBe('/heroes', '1st link should go to Heroes');
  // });

  // it('can click Heroes link in template', () => {
  //   const heroesLinkDe = linkDes[1];
  //   const heroesLink = links[1];

  //   expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');

  //   heroesLinkDe.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   expect(heroesLink.navigatedTo).toBe('/heroes');
  // });
}

describe('AppComponent (highlightDirective)', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ AppComponent, HighlightDirective],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(AppComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have skyblue <h2>', () => {
    const de = fixture.debugElement.query(By.css('h2'));
    expect(de.styles['backgroundColor']).toBe('skyblue');
  });
});