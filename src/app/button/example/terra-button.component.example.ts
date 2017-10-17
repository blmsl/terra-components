import { Component } from '@angular/core';

@Component({
               selector: 'terra-button-example',
               styles:   [require('./terra-button.component.example.scss')],
               template: require('./terra-button.component.example.html')
           })
export class TerraButtonComponentExample
{
    private buttonName:string;

    constructor()
    {
      this.buttonName ='hello';
    }

    public changeName():void
    {
        if(this.buttonName =='hello')
        {
            this.buttonName = 'world';
        }
        else
        {
            this.buttonName ='hello';
        }
    }
}
