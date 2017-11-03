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

    private _exampleAlert:TerraAlertComponent = TerraAlertComponent.getInstance();

    constructor(public translation:TranslationService)
    {
    }

    private showInformationAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'info-Alert',
            type:             'info',
            dismissOnTimeout: 2000,
            identifier:       'info'
        });
    }

    private showSuccessAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'success-Alert',
            type:             'success',
            dismissOnTimeout: 2000,
            identifier:       'info'
        });
    }

    private showErrorAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'error-Alert',
            type:             'danger',
            dismissOnTimeout: 2000,
            identifier:       'info'
        });
    }

    private showWarningAlert():void
    {
        this._exampleAlert.addAlert({
            msg:              'warning-Alert',
            type:             'warning',
            dismissOnTimeout: 2000,
            identifier:       'info'
        });
    }

}
