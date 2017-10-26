import {
    Component,
    OnInit
} from "@angular/core";
import { TerraButtonInterface } from '../../button/data/terra-button.interface';

@Component({
    selector: 'terra-no-result-notice-example',
    styles:   [require('./terra-no-result-notice.component.example.scss')],
    template: require('./terra-no-result-notice.component.example.html'),
})
export class TerraNoResultNoticeComponentExample implements OnInit
{
    private _inputNoResultButtons:Array<TerraButtonInterface>;

    ngOnInit()
    {
        this._inputNoResultButtons = [];

        this._inputNoResultButtons.push
        ({
            caption:       'test',
            isTertiary:    true,
            icon:          'icon-add',
            clickFunction: ():void =>
                           {
                           }
        });
    }

}