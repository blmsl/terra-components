import {
    Component,
    ViewChild
} from '@angular/core';
import { TerraOverlayComponent } from '../terra-overlay.component';

@Component({
    selector: 'overlay',
    template: require('./overlay.component.html')
})
export class OverlayComponentExample
{
    @ViewChild('overlay') public overlay:TerraOverlayComponent;

    private openOverlay():void
    {
        this.overlay.showOverlay();
    }
}