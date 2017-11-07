import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'terra-button',
    styles:   [require('./terra-button.component.scss')],
    template: require('./terra-button.component.html')
})
export class TerraButtonComponent
{
    /** @description If true, the button gets the primary color blue. Default false.*/
    @Input() inputIsPrimary:boolean;

    /** @description If true, the button gets the secondary color red. Default false.*/
    @Input() inputIsSecondary:boolean;

    /** @description */
    @Input() inputIsTertiary:boolean;

    /** @description If true, the button will be small. Default false.*/
    @Input() inputIsSmall:boolean;

    /** @description If true, the button will be large. Default false.*/
    @Input() inputIsLarge:boolean;

    /** @description If true, the button will be disabled. Default false.*/
    @Input() inputIsDisabled:boolean;

    /** @description Set the caption.*/
    @Input() inputCaption:string;

    /** @description Set an icon (e.g. icon-save).*/
    @Input() inputIcon:string;

    /** @description */
    @Input() inputType:string;

    /** @description  If true, the button will be aligned to the right side of another element. Default false.*/
    @Input() inputIsAlignRight:boolean;

    /** @description */
    @Input() inputIsHidden:boolean;

    /** @description Set the tooltip.*/
    @Input() inputTooltipText:string;

    /** @description Set the tooltip placement (bottom, top, left, right). Default top.*/
    @Input() inputTooltipPlacement:string; //top, bottom, left, right

    /** @description */
    @Input() inputIsActive:boolean;

    /** @description */
    @Input() inputIsFlagged:boolean;

    /** @description */
    @Input() inputIsDivider:boolean;

    /** @description */
    @Input() inputIsLink:boolean;

    /** @description */
    @Output() outputClicked = new EventEmitter<Event>();

    constructor()
    {
        this.inputTooltipPlacement = 'top';
        this.inputType = 'button';
        this.inputIsActive = false;
        this.inputIsFlagged = false;
        this.inputIsDivider = false;
        this.inputIsLink = false;
        this.inputIsDisabled = false;
    }

    private click(event:Event):void
    {
        if(isNullOrUndefined(this.inputIsDisabled) || this.inputIsDisabled === false)
        {
            this.outputClicked.emit(event);
        }
    }
}
