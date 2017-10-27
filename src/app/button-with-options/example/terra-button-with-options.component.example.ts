import {
    Component,
    OnInit
} from "@angular/core";


@Component({
    selector: 'terra-button-with-options-example',
    styles:   [require('./terra-button-with-options.component.example.scss')],
    template: require('./terra-button-with-options.component.example.html'),
})
export class TerraButtonWithOptionsComponentExample implements OnInit
{
    private _billingAddressOptionButtons = [];
    private _accountList = [];
    private _counter:number;

    public constructor()
    {
    }

    ngOnInit()
    {
        this._counter = 1;
        this._billingAddressOptionButtons.push({
            caption:       'new account',
            icon:          'icon-add',
            clickFunction: ():void => this.addAccount()
        });
        this._billingAddressOptionButtons.push({
            caption:       'Delete all accounts',
            icon:          'icon-delete',
            clickFunction: ():void => this.deleteAllAccounts()
        });

        this._accountList.push({
            user:     'Testuser',
            password: 'Testuser'
        });

    }

    public addAccount():void
    {
        this._accountList.push({
            user:     'Testuser' + this._counter,
            password: 'Testuser' + this._counter
        });
        this._counter++;
    }

    public deleteAllAccounts():void
    {
        this._accountList = [];
        this._counter = 1;
    }
}