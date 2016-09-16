import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    Ng2BootstrapModule,
    TooltipModule,
    AlertModule
} from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { PlentyTextInput } from './forms/input/text-input/plenty-text-input.component';
import { PlentyNumberInput } from './forms/input/number-input/plenty-number-input.component';
import { PlentyButton } from './button/plenty-button/plenty-button.component';
import { PlentyTreeComponent } from './tree/plenty-tree.component';
import { PlentyCheckboxTreeComponent } from './tree/checkbox-tree/plenty-checkbox-tree.component';
import { PlentyCheckbox } from './forms/checkbox/plenty-checkbox.component';
import { PlentySelectBox } from './forms/input/select-box/plenty-select-box.component';
import { PlentyDclWrapper } from './dcl-wrapper/plenty-dcl-wrapper.component';
import { PlentyIndicator } from './indicator/plenty-indicator.component';

@NgModule({
              declarations: [
                  AppComponent,
                  PlentyTextInput,
                  PlentyNumberInput,
                  PlentyButton,
                  PlentyTreeComponent,
                  PlentyCheckboxTreeComponent,
                  PlentyCheckbox,
                  PlentySelectBox,
                  PlentyDclWrapper,
                  PlentyIndicator
              ],
              imports:      [
                  BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  HttpModule,
                  Ng2BootstrapModule,
                  TooltipModule,
                  AlertModule
              ],
              providers:    [],
              bootstrap:    [AppComponent]
          })
export class AppModule
{
}
