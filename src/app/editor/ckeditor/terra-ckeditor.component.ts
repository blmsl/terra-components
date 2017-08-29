import {
    Component,
    ViewChild,
    Input
} from '@angular/core';

import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
    selector: 'terra-ckeditor',
    template: require('./terra-ckeditor.component.html'),
    styles:   [require('./terra-ckeditor.component.scss')]
})
export class TerraCkeditorComponent
{
    @ViewChild('ckeditor') editor:CKEditorComponent;
    @Input() ckeditorContent;

    constructor(){
        this.ckeditorContent = `<p>My HTML</p>`;
    }

}