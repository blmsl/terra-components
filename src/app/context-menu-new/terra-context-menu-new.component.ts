import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { TerraContextMenuNewInterface } from './data/terra-context-menu-new.interface';

@Component({
    selector: 'terra-context-menu-new',
    template: require('./terra-context-menu-new.component.html'),
    styles:   [require('./terra-context-menu-new.component.scss')]
})
export class TerraContextMenuNewComponent implements OnInit
{
    @Input() inputContextItems:Array<TerraContextMenuNewInterface>;

    constructor()
    {

    }

    ngOnInit()
    {

    }

}
