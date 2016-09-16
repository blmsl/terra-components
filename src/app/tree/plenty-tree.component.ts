import { Component, Input } from '@angular/core';
import {PlentyBaseTree} from "./base/plenty-base-tree.component";
import { PlentyLeaf } from './leaf/plenty-leaf.component';

@Component({
             selector: 'plenty-tree',
             templateUrl: 'plenty-tree.component.html',
             // styleUrls: ['tree.component.css']
           })
export class PlentyTree extends PlentyBaseTree{

  /**
   * current level leaf list
   */
  @Input() leafList:Array<PlentyLeaf>;

  /**
   * leafs one level higher than current leaf
   */
  @Input() parentLeafList:Array<PlentyLeaf>;
  constructor() {
    super();
  }
}
