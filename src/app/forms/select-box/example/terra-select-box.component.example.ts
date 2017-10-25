import {
    Component,
    OnInit
} from "@angular/core";
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

@Component({
    selector:  'terra-select-box-example',
    styles:    [require('./terra-select-box.component.example.scss')],
    template:  require('./terra-select-box.component.example.html'),
})
export class TerraSelectBoxComponentExample implements OnInit
{
    private _selectableOptionTypesList:any;
    private _addressOptionForm:FormGroup;

    constructor(){}

    ngOnInit(){
        this._selectableOptionTypesList = ['select-1', 'select-2', 'select-3'];
    }
}