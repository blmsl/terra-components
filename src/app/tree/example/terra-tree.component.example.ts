import {
    Component,
    OnInit
} from '@angular/core';
import { TerraLeafInterface } from '../leaf/terra-leaf.interface';

@Component({
    selector: 'terra-tree-example',
    template: require('./terra-tree.component.example.html'),
    styles:   [require('./terra-tree.component.example.scss')]
})

export class TreeShowcaseComponentExample implements OnInit
{

    private _leafList:Array<TerraLeafInterface> = [];

    ngOnInit()
    {
        this._leafList.push({
            caption:     'Leaf1',
            icon:        'icon-settings',
            subLeafList: [{
                caption:     'SubLeaf1',
                subLeafList: [{caption: 'SubSubLeaf1'},
                              {caption: 'SubSubLeaf2'}]
            },
                          {caption: 'SubLeaf2'}]
        });
        this._leafList.push({
            caption: 'Leaf2',
            icon:    'icon-settings'
        });
        this._leafList.push({caption: 'Leaf3'});
    }

}
