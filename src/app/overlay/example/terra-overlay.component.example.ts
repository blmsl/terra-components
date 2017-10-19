import {
    Component,
    ViewChild
} from '@angular/core';
import { TerraOverlayComponent } from '../terra-overlay.component';

@Component({
    selector: 'terra-overlay-example',
    template: require('./terra-overlay.component.example.html')
})
export class TerraOverlayComponentExample
{
    @ViewChild('overlay') public overlay:TerraOverlayComponent;

    private openOverlay():void
    {
        this.overlay.showOverlay();
    }
}