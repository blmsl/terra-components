/**
 * @author mkunze
 */
export interface TerraAlertInterface
{
    msg:string;
    closable:boolean;
    type:string;
    dismissOnTimeout:number;
    identifier?:string;
}