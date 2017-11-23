import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'terra-note',
    styles:   [require('./terra-note.component.scss')],
    template: require('./terra-note.component.html')
})
export class TerraNoteComponent
{
    /** @description If true, the note gets highlighted in blue.*/
    @Input() inputIsSelected:boolean;
    /** @description Is used to show an id inside the note.*/
    @Input() inputId:number;
    /** @description Is used to give the header a text.*/
    @Input() inputHeaderText:string;
    /** @description Is used to fill the note with text.*/
    @Input() inputNoteText:string;

    constructor()
    {
    }
}
