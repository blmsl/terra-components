import {
    Component
} from '@angular/core';

import { TerraAlertComponent } from '../terra-alert.component';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-alert-example',
    styles:   [require('./terra-alert.component.example.scss')],
    template: require('./terra-alert.component.example.html')
})
export class TerraAlertPanelComponentExample
{

    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(public translation:TranslationService)
    {
    }

    private onClick():void{
        this._alert.addAlert({
            msg:              'success - Alert',
            closable:         false,
            type:             'info',
            dismissOnTimeout: 2000,
            identifier:       'info'
        });
        this._alert.addAlert({
            msg:              'success - Alert',
            closable:         false,
            type:             'success',
            dismissOnTimeout: 2000,
            identifier:       'success'
        });
        this._alert.addAlert({
            msg:              'error - Alert',
            closable:         false,
            type:             'danger',
            dismissOnTimeout: 2000,
            identifier:       'error'
        });
        this._alert.addAlert({
            msg:              'warning - Alert',
            closable:         false,
            type:             'warning',
            dismissOnTimeout: 2000,
            identifier:       'warning'
        });
    }

}
