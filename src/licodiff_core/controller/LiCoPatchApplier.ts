import {LiCoPatch, LiCoPatchArray, OperationType} from "../data/LiCoPatch";

export namespace LiCoPatchApplier {
    export const Apply = (prev:string,patch:LiCoPatch) => {
        let res = "";
        let index = 0;
        patch.operations.forEach((e,i) => {
            switch (e.operationType) {
                case OperationType.Delete:
                    index += e.index;
                    break;
                case OperationType.Add:
                    res += e.str;
                    break;
                case OperationType.Keep:
                    res += prev.substring(index,index + e.index);
                    index += e.index;
                    break;
            }
        });
        return res;
    }
    export const ApplyAll = (prev:string,patchs:LiCoPatchArray) => {
        let res = prev;
        patchs.forEach((e,i) => {
           res = Apply(res,e);
        });
        return res;
    }
}
