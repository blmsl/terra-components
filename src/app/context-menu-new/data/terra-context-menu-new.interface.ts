export interface TerraContextMenuNewInterface
{
    caption:string;
    icon?:string;
    clickFunction:() => void;
    isDisabled?:boolean;
}
