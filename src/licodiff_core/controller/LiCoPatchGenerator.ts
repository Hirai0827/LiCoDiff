import diff from "fast-diff";
import {LiCoPatch, LiCoPatchOperation} from "../data/LiCoPatch";

export namespace LiCoPatchGenerator{
    export const Generate:(prev:string,current:string) => LiCoPatch = (prev:string,current:string) => {
        const diffRes = diff(prev,current);
        const liCoPatch = {operations:new Array<LiCoPatchOperation>()} as LiCoPatch;
        diffRes.forEach((e,i) => {
            if(e[0] == 1){
                liCoPatch.operations.push({operationType:e[0],str:e[1],index:-1});
            }else{
                liCoPatch.operations.push({operationType:e[0],str:"",index:e[1].length});
            }
        });
        return liCoPatch;
    }
}
