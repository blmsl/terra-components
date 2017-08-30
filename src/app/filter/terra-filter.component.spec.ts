import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TerraFilterComponent } from './terra-filter.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap';
import { TerraButtonComponent } from '../button/terra-button.component';
import { TerraBaseToolbarComponent } from '../toolbar/base-toolbar/terra-base-toolbar.component';

describe('Component: TerraFilterComponent',
         () =>
         {
             let comp:TerraFilterComponent;
             let fixture:ComponentFixture<TerraFilterComponent>;
             let deSearchButton:DebugElement;
             let deResetButton:DebugElement;

             beforeEach(async(() =>
                              {
                                  TestBed.configureTestingModule({
                                                                     declarations: [TerraFilterComponent,
                                                                                    TerraButtonComponent,
                                                                                    TerraBaseToolbarComponent],
                                                                     imports:      [TooltipModule.forRoot()]
                                                                 })
                                         .compileComponents()
                                         .then(() =>
                                               {
                                                   fixture = TestBed.createComponent(TerraFilterComponent);
                                                   comp = fixture.componentInstance;
                                                   deSearchButton = fixture.debugElement.queryAll(By.css('.terra-button'))[0];
                                                   deResetButton = fixture.debugElement.queryAll(By.css('.terra-button'))[1];
                                               })
                              }));

             it('should create an instance',
                () =>
                {
                    expect(comp).toBeTruthy();
                });

             it('should have two buttons',
                () =>
                {
                    expect(deSearchButton).toBeTruthy();
                    expect(deResetButton).toBeTruthy();
                });

             it('should emit a search button clicked event',
                () =>
                {
                    //deSearchButton.triggerEventHandler('snöff',
                    //                                   null);

                    fixture.whenStable()
                           .then(() =>
                                 {
                                     comp.outputOnSearchBtnClicked.subscribe((output) =>
                                                                             {
                                                                                 console.log(output);
                                                                                 expect(output).toBeNull();
                                                                             });
                                 });
                });

         });