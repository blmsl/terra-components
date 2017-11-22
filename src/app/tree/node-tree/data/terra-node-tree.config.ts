
import { TerraNodeInterface } from './terra-node.interface';
import { isNullOrUndefined } from 'util';
import { EventEmitter } from '@angular/core';

export class TerraNodeTreeConfig<D>
{
    private _list:Array<TerraNodeInterface<D>> = [];
    private _currentSelectedNode:TerraNodeInterface<D>;

    private _addNodeEventEmitter:EventEmitter<TerraNodeInterface<D>> = new EventEmitter<TerraNodeInterface<D>>();

    public addNode(nodeToAdd:TerraNodeInterface<D>, parent?:TerraNodeInterface<D>):void
    {
        let alreadyAddedNode:TerraNodeInterface<D> = this.findNodeById(nodeToAdd.id);

        if(isNullOrUndefined(alreadyAddedNode))
        {
            if(isNullOrUndefined(parent))
            {
                this._list.push(nodeToAdd);
            }
            else
            {
                nodeToAdd.parent = parent;

                if(isNullOrUndefined(parent.children))
                {
                    parent.children = [nodeToAdd];
                }
                else
                {
                    parent.children.push(nodeToAdd);
                }
            }

            this.addNodeEventEmitter.next(nodeToAdd);
        }
        else
        {
            console.error('Node ' + nodeToAdd.name + ' with id ' + nodeToAdd.id + ' already added!');
        }
    }

    public removeNode(node:TerraNodeInterface<D>):void
    {
        let foundNode:TerraNodeInterface<D> = this.recursiveFindNode(this.list, node);
        
        if(isNullOrUndefined(foundNode))
        {
           console.error('Node ' + node.name + ' with id ' + node.id + ' not found!')
        }
        else
        {
            let parent:TerraNodeInterface<D> = foundNode.parent;
            
            let index:number = parent.children.indexOf(foundNode);
            
            parent.children.splice(index, 1);
        }
    }

    public updateNode(node:TerraNodeInterface<D>):void
    {

    }

    public findNodeById(id:string|number):TerraNodeInterface<D>
    {
        return this.recursiveFindNodeById(this.list, id);
    }
    
    public findNode(node:TerraNodeInterface<D>):TerraNodeInterface<D>
    {
        return this.recursiveFindNode(this.list, node);
    }
    
    private recursiveFindNode(nodeList:Array<TerraNodeInterface<D>>, nodeToFind:TerraNodeInterface<D>):TerraNodeInterface<D>
    {
        let foundNode:TerraNodeInterface<D> = null;
        
        for(let node of nodeList)
        {
            if(node === nodeToFind)
            {
                foundNode = node;
            
                return foundNode
            }
            else if(node.children)
            {
                foundNode = this.recursiveFindNode(node.children, nodeToFind);
            
                if(foundNode != null)
                {
                    break;
                }
            }
        }
    
        return foundNode;
    }
    
    private recursiveFindNodeById(nodeList:Array<TerraNodeInterface<D>>, id:string|number):TerraNodeInterface<D>
    {
        let foundNode:TerraNodeInterface<D> = null;
        
        for(let node of nodeList)
        {
            if(node.id.toString() === id.toString())
            {
                foundNode = node;
            
                return foundNode
            }
            else if(node.children)
            {
                foundNode = this.recursiveFindNodeById(node.children, id);
            
                if(foundNode != null)
                {
                    break;
                }
            }
        }
    
        return foundNode;
    }

    public get list():Array<TerraNodeInterface<D>>
    {
        return this._list;
    }

    public get addNodeEventEmitter():EventEmitter<TerraNodeInterface<D>>
    {
        return this._addNodeEventEmitter;
    }

    public set currentSelectedNode(value:TerraNodeInterface<D>)
    {
        this._currentSelectedNode = value;
    }

    public get currentSelectedNode():TerraNodeInterface<D>
    {
        return this._currentSelectedNode;
    }

    public reset():void
    {
        this._list = [];
        this._currentSelectedNode = null;
        this._addNodeEventEmitter.unsubscribe();
        this._addNodeEventEmitter = new EventEmitter<TerraNodeInterface<D>>();
    }
}