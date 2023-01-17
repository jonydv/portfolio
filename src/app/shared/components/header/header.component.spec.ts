import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BreakpointService } from '../../../services/breakpoint.service';
import { of, Observable } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';
import { ScrollLockService } from 'src/app/services/scroll-lock.service';

class FakeBreakpoint {
  isMobile$: Observable<boolean> = of(false);
}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: ScrollLockService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: BreakpointService, useClass: FakeBreakpoint },
        ScrollLockService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ScrollLockService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have multiple anchor tags with the same link of the navItems', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );

    let exists: boolean = true;
    for (const elem of elements) {
      if (
        component.navItems[elements.indexOf(elem)].link !=
        elem.attributes['href']
      ) {
        exists = false;
        break;
      }
    }
    expect(exists).toBeTruthy();
  });

  it('Sholud toggle to true/false the value of showNav', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    component.toggleShowNav();
    fixture.detectChanges();

    expect(component.showNav).toBeTruthy();

    component.toggleShowNav();
    fixture.detectChanges();

    expect(component.showNav).toBeFalsy();
  });

  it('should call scrollLockService.lock() when toggleShowNav() is called and showNav is true', () => {
    spyOn(service, 'lock');
    component.toggleShowNav();
    fixture.detectChanges();
    expect(service.lock).toHaveBeenCalled();
  });

  it('should call scrollLockService.unlock() when toggleShowNav() is called and showNav is false', () => {
    component.showNav = true;
    fixture.detectChanges();
    spyOn(service, 'unlock');
    component.toggleShowNav();
    fixture.detectChanges();
    expect(service.unlock).toHaveBeenCalled();
  });
});
