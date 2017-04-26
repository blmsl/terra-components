import { } from 'jasmine';
import {
    TestBed,
    async
} from '@angular/core/testing';
import { TerraComponentsComponent } from './terra-components.component';
import { TranslationModule } from 'angular-l10n';
import { HttpModule } from '@angular/http';

describe('App: TerraComponentsComponent', () =>
{
    beforeEach(() =>
               {
                   TestBed.configureTestingModule({
                                                      declarations: [
                                                          TerraComponentsComponent
                                                      ],
                                                      imports:      [
                                                          HttpModule,
                                                          TranslationModule.forRoot()
                                                      ]
                                                  });
               });
    
    it('should create the app', async(() =>
                                      {
                                          let fixture = TestBed.createComponent(TerraComponentsComponent);
                                          let app = fixture.debugElement.componentInstance;
                                          expect(app).toBeTruthy();
                                      }));
});
