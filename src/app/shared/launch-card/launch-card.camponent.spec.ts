import {LaunchCardComponent} from "./launch-card.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Launch} from "../../models/launch";
import {Component, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {DatePipe, LowerCasePipe} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";

describe('LaunchCardComponent', () => {
    let component: LaunchCardComponent;
    let fixture: ComponentFixture<LaunchCardComponent>;

    beforeEach(async () => {
        fixture = TestBed.createComponent(LaunchCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', function () {
        expect(component).toBeTruthy();
    });
});

@Component({
    template: '<ab-launch-card [launch]="launch" (addToFavorites)="onClicAddToFavorites()" (removeFromFavorites)="onClicRemoveFromFavorites()" [allowAddToFavorites]="allowAddToFavorites" [allowRemoveFromFavorites]="allowRemoveFromFavorites"></ab-launch-card>'
})
class LaunchCardHostComponent {
    public launch !: Launch;
    public allowAddToFavorites = true;
    public allowRemoveFromFavorites = true;

    constructor() {
    }

    public onClicAddToFavorites() {
    }

    public onClicRemoveFromFavorites() {
    }
}

fdescribe('GIVEN the LaunchCardComponent on a Host Component', () => {
    let hostComponent: LaunchCardHostComponent;
    let hostFixture: ComponentFixture<LaunchCardHostComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                LaunchCardComponent,
                LaunchCardHostComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        hostFixture = TestBed.createComponent(LaunchCardHostComponent);
        hostComponent = hostFixture.componentInstance;
        hostFixture.detectChanges();
    });

    describe('WHEN recieves an input Launch', () => {
        beforeEach(() => {
            hostComponent.launch = {
                id: '1',
                slug: 'slug',
                name: 'nombre',
                net: new Date('11/07/2021 19:19:41 +0100'),
                status: {name: 'pendiente'},
                pad: {
                    name: 'pad-name',
                    location: {
                        name: 'location name'
                    }
                }
            }
            hostFixture.detectChanges();
        });

        it('THEN should display the net date', () => {
            const actual = hostFixture.nativeElement.querySelector('.pendiente').textContent;
            const expected = new Date();
            expect(actual.trim()).toBe('07/11/2021 19:19:41 +0100');
        });
    });

    describe('WHEN users clicks on a button', () => {
        beforeEach(() => {
            spyOn(hostComponent, 'onClicAddToFavorites');
            spyOn(hostComponent, 'onClicRemoveFromFavorites');
            hostComponent.launch = {
                id: '1',
                slug: 'slug',
                name: 'nombre',
                net: new Date('11/07/2021 19:19:41 +0100'),
                status: {name: 'pendiente'},
                pad: {
                    name: 'pad-name',
                    location: {
                        name: 'location name'
                    }
                }
            }
            hostComponent.allowRemoveFromFavorites = false;
            hostFixture.detectChanges();
            hostFixture.nativeElement.querySelector('button').click();
        });

        it('THEN should emit the event onClicAddToFavorites', () => {
            expect(hostComponent.onClicAddToFavorites).toHaveBeenCalled();
        });

    });

    describe('WHEN users clicks on a button', () => {
        beforeEach(() => {
            spyOn(hostComponent, 'onClicAddToFavorites');
            spyOn(hostComponent, 'onClicRemoveFromFavorites');
            hostComponent.launch = {
                id: '1',
                slug: 'slug',
                name: 'nombre',
                net: new Date('11/07/2021 19:19:41 +0100'),
                status: {name: 'pendiente'},
                pad: {
                    name: 'pad-name',
                    location: {
                        name: 'location name'
                    }
                }
            }
            hostComponent.allowAddToFavorites = false;
            hostFixture.detectChanges();
            hostFixture.nativeElement.querySelector('button').click();
        });

        it('THEN should emit the event onClicRemoveFromFavorites', () => {
            expect(hostComponent.onClicRemoveFromFavorites).toHaveBeenCalled();
        });
    });
});
