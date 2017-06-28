import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    EventEmitter,
    Input,
    ModuleWithComponentFactories,
    ModuleWithProviders,
    OnDestroy,
    Output,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { JitCompiler } from '@angular/compiler';

@Component({
               selector: 'terra-dynamic-module-loader',
               template: require('./terra-dynamic-module-loader.component.html'),
               styles:   [require('./terra-dynamic-module-loader.component.scss')]
           })
export class TerraDynamicModuleLoaderComponent implements AfterViewInit, OnDestroy
{
    private _changeDetectorRef: ChangeDetectorRef;

    @ViewChild('viewChildTarget', {read: ViewContainerRef}) viewChildTarget;
    @Input() inputModule:any;
    @Input() inputMainComponentName:string;
    @Input() inputParameter:any;
    @Input() get changeDetectorRef():ChangeDetectorRef
    {
        return this._changeDetectorRef;
    }

    @Output() changeDetectorRefChange = new EventEmitter();

    set changeDetectorRef(val:ChangeDetectorRef) {
        this._changeDetectorRef = val;
        this.changeDetectorRefChange.emit(this._changeDetectorRef);
    }

    private _resolvedData:ModuleWithProviders;
    
    private _cmpRef:ComponentRef<any>;
    
    constructor(private _jitCompiler:JitCompiler)
    {
    }
    
    ngAfterViewInit()
    {
        this._resolvedData = this.inputModule as ModuleWithProviders;
        this.updateComponent();
    }
    
    ngOnDestroy()
    {
        if(this._cmpRef)
        {
            this._cmpRef.destroy();
        }
    }
    
    private updateComponent():void
    {
        this._jitCompiler
            .compileModuleAndAllComponentsAsync(this._resolvedData.ngModule)
            .then((moduleWithFactories:ModuleWithComponentFactories<any>) =>
                  {
                      moduleWithFactories.componentFactories.forEach
                      (
                          (factory) =>
                          {
                              if(this.inputMainComponentName === factory.componentType.name)
                              {
                                  this._cmpRef = this.viewChildTarget.createComponent(factory);
                        
                                  this._cmpRef.instance.parameter = this.inputParameter;

                                  this.changeDetectorRef = this._cmpRef.changeDetectorRef;
                              }
                          }
                      )
            
                  });
    }
}
