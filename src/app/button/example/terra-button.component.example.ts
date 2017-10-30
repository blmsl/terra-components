import {
    Component,
    ViewChild
} from '@angular/core';

import { TerraOverlayComponent } from '../../../overlay/terra-overlay.component';

@Component({
    selector: 'terra-button-example',
    styles:   [require('./terra-button.component.example.scss')],
    template: require('./terra-button.component.example.html')
})
export class TerraButtonComponentExample
{

    @ViewChild('overlay') public overlay:TerraOverlayComponent;
    private _text:string;

    private openOverlay(buttonType):void
    {
        switch(buttonType)
        {
            case 1:
                this._text = 'The grey button is used to do anything else ' +
                             'than the blue, red and green button!';
                break;
            case 2:
                this._text = 'The blue button is used to navigate somewhere!';
                break;
            case 3:
                this._text = 'The red button is used to delete something!';
                break;
            case 4:
                this._text = 'The green button is used to add something!';
                break;
            default:
                break;
        }
        this.overlay.showOverlay();
    }
}
