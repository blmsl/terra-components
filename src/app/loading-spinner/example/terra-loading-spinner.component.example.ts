import {
    Component
} from "@angular/core";
import { TerraLoadingSpinnerService } from '../service/terra-loading-spinner.service';

@Component({
    selector: 'terra-loading-spinner-example',
    styles:   [require('./terra-loading-spinner.component.example.scss')],
    template: require('./terra-loading-spinner.component.example.html')
})
export class TerraLoadingSpinnerComponentExample
{

    constructor(private _terraLoadingSpinnerService:TerraLoadingSpinnerService)
    {
    }

    public showLoadingSpinner():void{
        this._terraLoadingSpinnerService.start();
        setTimeout(this.showLoadingSpinner(),5000);
        this._terraLoadingSpinnerService.stop();
    }

}