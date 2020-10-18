export interface LiCoPatch {
    operations:Array<LiCoPatchOperation>
}
export interface LiCoPatchOperation {
    operationType:OperationType;
    index:number;
    str:string;
}
export enum OperationType {
    Delete=-1,Keep=0,Add=1
}
export type LiCoPatchArray = Array<LiCoPatch>;
