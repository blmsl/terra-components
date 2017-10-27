import { Component } from '@angular/core';

import { TerraAlertComponent } from '../terra-alert.component';
import { TranslationService } from 'angular-l10n';

@Component({
    selector: 'terra-alert-example',
    styles:   [require('./terra-alert.component.example.scss')],
    template: require('./terra-alert.component.example.html')
})
export class TerraAlertComponentExample
{

    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(public translation:TranslationService)
    {
    }

    private showInformationAlert():void
    {
        this._alert.addAlert({
                                 msg:              'info - Alert',
                                 closable:         false,
                                 type:             'info',
                                 dismissOnTimeout: 2000,
                                 identifier:       'info'
                             });
    }
    private showSuccessAlert():void
    {
        this._alert.addAlert({
                                 msg:              'success - Alert',
                                 closable:         false,
                                 type:             'success',
                                 dismissOnTimeout: 2000,
                                 identifier:       'success'
                             });
    }
    private showErrorAlert():void
    {
        this._alert.addAlert({
                                 msg:              'error - Alert',
                                 closable:         false,
                                 type:             'danger',
                                 dismissOnTimeout: 2000,
                                 identifier:       'error'
                             });
    }
    private showWarningAlert():void
    {
        this._alert.addAlert({
                                 msg:              'warning - Alert',
                                 closable:         false,
                                 type:             'warning',
                                 dismissOnTimeout: 2000,
                                 identifier:       'warning'
                             });
    }
}
