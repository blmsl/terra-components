/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import { TerraButtonComponent } from './terra-button.component';
import { TooltipModule } from 'ng2-bootstrap';
import { By } from '@angular/platform-browser';


describe('Component: TerraButtonComponent', () =>
{
    let comp:TerraButtonComponent;
    let fixture:ComponentFixture<TerraButtonComponent>;
    let de:DebugElement;
    let el:HTMLElement;
    
    
    beforeEach(async(() =>
                     {
                         TestBed.configureTestingModule({
                                                            declarations: [TerraButtonComponent],
                                                            imports:      [TooltipModule.forRoot()]
                                                        })
                                .compileComponents()
                                .then(() =>
                                      {
                                          fixture = TestBed.createComponent(TerraButtonComponent);
                                          comp = fixture.componentInstance;
                                          de = fixture.debugElement.query(By.css('.btn'));
                                          el = de.nativeElement;
                                      });
                     }));
    
    
    it('should create an instance', () =>
    {
        expect(comp).toBeTruthy();
    });
    
    it('should emit an output event', () =>
    {
        spyOn(comp, 'click');
        
        el.click();
        
        fixture.whenStable().then(()=>{
            expect(comp.click).toHaveBeenCalled();
        });
    });
});
