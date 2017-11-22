import {
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TerraNodeTreeConfig } from './data/terra-node-tree.config';
import { TerraNodeInterface } from './data/terra-node.interface';
import { isNullOrUndefined } from 'util';

@Component({
               selector: 'terra-node-tree',
               styles:   [require('./terra-node-tree.component.scss')],
               template: require('./terra-node-tree.component.html')
           })
export class TerraNodeTreeComponent<D> implements OnDestroy, OnInit
{
    @Input()
    inputConfig:TerraNodeTreeConfig<D>;

    constructor()
    {

    }

    public ngOnInit():void
    {
        this.inputConfig.addNodeEventEmitter.subscribe((value:TerraNodeInterface<D>) =>
                                                       {
                                                           if(!isNullOrUndefined(value.parent))
                                                           {
                                                               value.parent.isOpen = true;
                                                           }
                                                       });
    }

    public ngOnDestroy():void
    {
        this.inputConfig.reset();
    }
}