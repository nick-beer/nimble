import { Component, ElementRef, Sanitizer, SecurityContext, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { processUpdates } from '../../../testing/async-helpers';
import { NimbleBreadcrumbModule } from '../../breadcrumb/nimble-breadcrumb.module';
import { NimbleBreadcrumbItemModule } from '../nimble-breadcrumb-item.module';
import type { BreadcrumbItem } from '../nimble-breadcrumb-item.directive';

describe('Nimble breadcrumb item RouterLinkWithHrefDirective', () => {
    @Component({
        template: `
            <nimble-breadcrumb>
                <nimble-breadcrumb-item #breadcrumbItem1 nimbleRouterLink="page1" [queryParams]="{param1: true}" [state]="{stateProperty: 123}">
                    Breadcrumb Text
                </nimble-breadcrumb-item>
            </nimble-breadcrumb>
            <router-outlet></router-outlet>
         `
    })
    class TestHostComponent {
        @ViewChild('breadcrumbItem1', { static: true }) public breadcrumbItem1: ElementRef<BreadcrumbItem>;
    }

    @Component({ template: '' })
    class BlankComponent { }

    let breadcrumbItem1: BreadcrumbItem;
    let fixture: ComponentFixture<TestHostComponent>;
    let testHostComponent: TestHostComponent;
    let router: Router;
    let location: Location;
    let anchor: HTMLAnchorElement;
    let separator: HTMLSpanElement;
    let routerNavigateByUrlSpy: jasmine.Spy;
    let anchorClickHandlerSpy: jasmine.Spy;
    let separatorClickHandlerSpy: jasmine.Spy;
    let sanitizer: jasmine.SpyObj<Sanitizer>;

    beforeEach(() => {
        sanitizer = jasmine.createSpyObj<Sanitizer>('Sanitizer', ['sanitize']);
        sanitizer.sanitize.and.callFake((_, value: string) => value);

        TestBed.configureTestingModule({
            declarations: [TestHostComponent, BlankComponent],
            imports: [NimbleBreadcrumbModule, NimbleBreadcrumbItemModule,
                CommonModule,
                RouterTestingModule.withRoutes([
                    { path: '', redirectTo: '/start', pathMatch: 'full' },
                    { path: 'page1', component: BlankComponent },
                    { path: 'start', component: TestHostComponent }
                ], { useHash: true })
            ],
            providers: [
                { provide: Sanitizer, useValue: sanitizer }
            ]
        });
    });

    beforeEach(fakeAsync(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = fixture.componentInstance;
        breadcrumbItem1 = testHostComponent.breadcrumbItem1.nativeElement;
        fixture.detectChanges();
        tick();
        processUpdates();
        anchor = breadcrumbItem1!.shadowRoot!.querySelector('a')!;
        separator = breadcrumbItem1!.shadowRoot!.querySelector('.separator')!;
        routerNavigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
        anchorClickHandlerSpy = jasmine.createSpy('click');
        separatorClickHandlerSpy = jasmine.createSpy('click');
        anchor.addEventListener('click', anchorClickHandlerSpy);
        separator.addEventListener('click', separatorClickHandlerSpy);
    }));

    afterEach(() => {
        processUpdates();
    });

    it('navigates via router.navigateByUrl when link is clicked', fakeAsync(() => {
        anchor!.click();
        tick();

        const expectedDestinationUrl = '/page1?param1=true';
        const expectedUrlTree = router.parseUrl(expectedDestinationUrl);
        expect(routerNavigateByUrlSpy).toHaveBeenCalledOnceWith(expectedUrlTree, jasmine.objectContaining({
            state: {
                stateProperty: 123
            }
        }));
        expect(location.path()).toEqual(expectedDestinationUrl);
    }));

    it('does not navigate via router.navigateByUrl when separator is clicked', fakeAsync(() => {
        separator!.click();
        tick();

        expect(separatorClickHandlerSpy).toHaveBeenCalledTimes(1);
        expect(routerNavigateByUrlSpy).not.toHaveBeenCalled();
    }));

    const secondaryClickTests: { testName: string, clickArgs: { [key: string]: unknown } }[] = [
        { testName: 'middle mouse click', clickArgs: { button: 1 } },
        { testName: 'Ctrl + left-click', clickArgs: { button: 0, ctrlKey: true } }
    ];
    secondaryClickTests.forEach(test => {
        it(`does not do router navigation for non-primary-mouse link clicks for ${test.testName}`, fakeAsync(() => {
            anchor!.dispatchEvent(new MouseEvent('click', {
                ...{
                    bubbles: true,
                    cancelable: true
                },
                ...test.clickArgs
            }));
            tick();

            expect(anchorClickHandlerSpy).toHaveBeenCalledTimes(1);
            expect(routerNavigateByUrlSpy).not.toHaveBeenCalled();
        }));
    });

    it('sanitized initial href created from nimbleRouterLink', () => {
        expect(sanitizer.sanitize).toHaveBeenCalledWith(SecurityContext.URL, '/page1?param1=true');
    });
});
