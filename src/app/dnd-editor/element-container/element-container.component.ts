import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { DndEditorService } from '../dnd-editor.service';
import { Subscription } from 'rxjs/Subscription';
import { DndEditorElement } from '../model/dnd-editor-element.interface';
import {
    DND_EDITOR_PROPERTY_METADATA_KEY,
    DndEditorElementProperty
} from '../model/dnd-editor-element-property.decorator';
import { ElementDropzoneComponent } from '../element-dropzone/element-dropzone.component';
import {
    DndEditorDocument,
    DndEditorDocumentItem
} from '../model/dnd-editor-document.interface';
import { TerraDraggableDirective } from '../../interactables/draggable.directive';
import { DraggableFactory } from '../../interactables/draggable.factory';

@Component({
    selector: 'dnd-editor-element-container',
    template: require('./element-container.component.html'),
    styles:   [require('./element-container.component.scss')]
})
export class ElementContainerComponent implements OnInit, AfterViewInit, OnDestroy
{
    public documentItem:DndEditorDocumentItem;

    public editorElement:DndEditorElement;

    public destroy:() => void;

    public documentItemChange:EventEmitter<void> = new EventEmitter<void>();

    private dropzones:ElementDropzoneComponent[] = [];

    @ViewChild('container', {read: ViewContainerRef})
    private container:ViewContainerRef;

    @ViewChild( TerraDraggableDirective )
    private draggableElement: TerraDraggableDirective;

    public componentRef:ComponentRef<any>;
    private selected:boolean = false;

    private selectedComponentSubscription:Subscription;

    private get isSelectable():boolean
    {
        return this.editorService && this.editorService.hoveredElementContainer === this;
    }

    constructor(private element:ElementRef,
                private editorService:DndEditorService,
                private changeDetector:ChangeDetectorRef,
                private componentFactoryResolver:ComponentFactoryResolver)
    {
    }

    public ngOnInit():void
    {
        this.selectedComponentSubscription =
            this.editorService.selectedComponent.subscribe((componentRef:ComponentRef<any>) =>
            {
                this.selected = componentRef === this.componentRef;
                this.changeDetector.detectChanges();
            });
    }

    public ngAfterViewInit():void
    {
        new DraggableFactory(
            this.draggableElement
        );
    }

    public get dragData()
    {
        return {
            element: this.editorElement,
            documentItem: this.getDocumentItem()
        }
    }

    public initEditorElement(editorElement:DndEditorElement, documentItem?:DndEditorDocumentItem):void
    {
        this.editorElement = editorElement;
        this.documentItem = documentItem;
        this.componentRef = this.container.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(editorElement.component)
        );

        Object.keys(this.componentRef.instance).forEach((property:string) =>
        {

            if(this.componentRef.instance[property] instanceof EventEmitter)
            {
                // subscribe to @Output() properties
                this.componentRef.instance[property].subscribe(() =>
                {
                    this.documentItemChange.emit();
                });
            }
            else
            {
                // set initial data if defined
                if(documentItem && documentItem.properties)
                {
                    if(documentItem.name !== editorElement.component.name)
                    {
                        console.error("DocumentItem does not match to component of EditorElement");
                    }
                    else
                    {
                        Object.keys(documentItem.properties).forEach((property:string) =>
                        {
                            this.componentRef.instance[property] = documentItem.properties[property];
                        });
                    }
                    this.componentRef.changeDetectorRef.detectChanges();
                }
            }

        });

        this.editorService.selectComponent(this.componentRef);
        this.selected = true;
        this.changeDetector.detectChanges();
    }

    public ngOnDestroy():void
    {
        if(this.selectedComponentSubscription)
        {
            this.selectedComponentSubscription.unsubscribe();
        }
    }

    public setSelectable(value:boolean, event?:Event)
    {
        if(value)
        {
            this.editorService.hoverElementContainer(this, event);
        }
        else
        {
            this.editorService.hoveredElementContainer = null;
        }
        this.changeDetector.detectChanges();

    }

    public selectComponent(event:Event)
    {
        event.stopPropagation();
        this.editorService.selectComponent(this.componentRef);
    }

    public registerDropzone(dropzone:ElementDropzoneComponent)
    {
        this.dropzones.push(dropzone);

        if(this.documentItem && this.documentItem.children)
        {
            Object.keys(this.documentItem.children).forEach((dropzoneId:string) =>
            {
                let dropzone:ElementDropzoneComponent = this.dropzones.find((d:ElementDropzoneComponent) =>
                {
                    return d.dropzoneId === dropzoneId;
                });

                if(!dropzone)
                {
                    console.error("Cannot find dropzone with id: " + dropzoneId);
                }
                else
                {
                    dropzone.initDropzone(this.documentItem.children[dropzoneId]);
                }

            });
        }

        dropzone.onDocumentChange.subscribe(() =>
        {
            this.documentItemChange.emit();
        });
    }

    public getDocumentItem():DndEditorDocumentItem
    {
        if(this.componentRef)
        {
            let properties:{ [key:string]:DndEditorElementProperty } = Reflect.getMetadata(DND_EDITOR_PROPERTY_METADATA_KEY,
                    this.componentRef.componentType) || {};
            let annotations:{ [key:string]:any } = Reflect.getMetadata("annotations", this.componentRef.componentType) || {};
            let propMetadata:any[] = Reflect.getMetadata("propMetadata", this.componentRef.componentType) || {};
            let values:{ [key:string]:any } = {};

            Object.keys(properties).forEach(key =>
            {
                values[key] = this.componentRef.instance[key];
            });

            Object.keys(propMetadata).forEach(prop =>
            {
                if(!(this.componentRef.instance[prop] instanceof EventEmitter))
                {
                    values[prop] = this.componentRef.instance[prop];
                }
            });

            let children:DndEditorDocument = {};

            this.dropzones.forEach((dropzone:ElementDropzoneComponent, index:number) =>
            {
                let key = dropzone.dropzoneId || index + '';
                children[key] = dropzone.getDocumentItems();
            });

            return {
                name:       this.componentRef.componentType.name,
                selector:   annotations[0].selector,
                properties: values,
                children:   children
            };
        }

        return null;
    }
}