import {SearchComponent} from "./search.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpaceService} from "../core/space.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Observable, of} from "rxjs";
import {Launch} from "../models/launch";


fdescribe('GIVEN the SearchComponent form', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    const submitButtonSelector = 'button[type="submit"]';
    type searchMethod = { getSearchedLaunches$: Observable<Launch[]> };
    let spaceServiceSpy: jasmine.SpyObj<searchMethod>;

    beforeEach(async () => {
        spaceServiceSpy = jasmine.createSpyObj<searchMethod>('SpaceService', {
            getSearchedLaunches$: of({
                id: '1',
                slug: 'slug',
                name: 'name',
                net: new Date(),
                status: {
                    name: 'estado',
                },
                pad: {
                    name: 'name',
                    location: {
                        name: 'location name',
                    },
                },
            })
        });
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, HttpClientTestingModule, FormsModule],
            declarations: [SearchComponent],
            providers: [{provide: SpaceService, useValue: spaceServiceSpy}],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
    })

    describe('WHEN user submits the form after fill it', () => {
        beforeEach(async () => {
            const submitButton = findNativeEl(fixture, submitButtonSelector);
            submitButton?.click();
        });

        it('THEN should call expected method', () => {
            expect(spaceServiceSpy.getSearchedLaunches$).toHaveBeenCalled()
        });
    });
});

function findNativeEl<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement {
    return fixture.nativeElement.querySelector(selector);
}
