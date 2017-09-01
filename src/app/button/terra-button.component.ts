import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';


/**
 * Example of usage:
 * <example>
 *     <file name="index.html">
 *         <terra-button [inputIsPrimary]="true"></terra-button>
 *     </file>
 *     <file name="app.js">
 *         console.log('Test');
 *     </file>
 * </example>
 *
 *
 *
 */
@Component({
               selector: 'terra-button',
               styles:   ['terra-button.component.scss'],
               templateUrl: 'terra-button.component.html'
           })
export class TerraButtonComponent
{
    @Input() inputIsPrimary:boolean;
    @Input() inputIsSecondary:boolean;
    @Input() inputIsTertiary:boolean;
    @Input() inputIsSmall:boolean;
    @Input() inputIsLarge:boolean;
    @Input() inputIsDisabled:boolean;
    @Input() inputCaption:string;
    @Input() inputIcon:string;
    @Input() inputType:string;
    @Input() inputIsAlignRight:boolean;
    @Input() inputIsHidden:boolean;
    @Input() inputTooltipText:string;
    @Input() inputTooltipPlacement:string; //top, bottom, left, right
    @Input() inputIsActive:boolean;
    @Input() inputIsFlagged:boolean;
    @Input() inputIsDivider:boolean;
    @Output() outputClicked = new EventEmitter<any>();

    constructor()
    {
        this.inputTooltipPlacement = 'top';
        this.inputType = 'button';
        this.inputIsActive = false;
        this.inputIsFlagged = false;
        this.inputIsDivider = false;
    }

    /**
     * Click function
     */
    private click():void
    {
        this.outputClicked.emit(null);
    }
}
