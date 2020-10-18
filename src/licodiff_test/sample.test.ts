import diff from "fast-diff";
import {TestRandom} from "./TestRandom";
import {LiCoPatchGenerator} from "../licodiff_core/controller/LiCoPatchGenerator";
import {LiCoPatch, LiCoPatchArray} from "../licodiff_core/data/LiCoPatch";
import {LiCoPatchApplier} from "../licodiff_core/controller/LiCoPatchApplier";

test("sample",() => {
    expect(1 + 2).toBe(3);
});
test("random_diff_and_restore",() => {
    const len = 100000;
    const iter = 100;
    let init = TestRandom.GenerateRandomSentence(len);
    let prev = init;
    let current = init;
    let diffArray:LiCoPatchArray = new Array<LiCoPatch>();
    for(let i = 0; i < iter; i++){
        const targetIndex = Math.floor(Math.random() * (len - 1));
        current = current.substring(0,targetIndex) +TestRandom.GenerateRandomChar()+ current.substring(targetIndex + 1,len);
        current = current.substring(0,targetIndex) +TestRandom.GenerateRandomChar()+ current.substring(targetIndex + 1,len);
        current = current.substring(0,targetIndex) +TestRandom.GenerateRandomChar()+ current.substring(targetIndex + 1,len);
        const liCoPatch = LiCoPatchGenerator.Generate(prev,current);
        diffArray.push(liCoPatch);
        prev = current;
    }

    expect(LiCoPatchApplier.ApplyAll(init,diffArray)).toBe(prev);
});
test("diff_and_restore_1",() => {
    const A = "vec3 c = vec3(1.0,1.0,1.0);";
    const B = "vec3 c = vec3(1.0,0.5,1.0);";
    const C = "vec3 d = vec3(1.0,0.5,1.0);";
    const D = "vec3 d = vec3(1.0,0.5,sin(iTime));";
    const E = "vec3 d=vec3(1.0,0.5,sin(iTime));";
    const F = "vec3 d=vec3(1.0,0.5,sin(iTime)); d+=vec3(1.0,0.2,1.0);";
    const G = "vec3 d=vec3(1.0,5.0,sin(iTime)); d+=vec3(1.0,2.0,1.0);";
    let diffArray:LiCoPatchArray = new Array<LiCoPatch>();
    diffArray.push(LiCoPatchGenerator.Generate(A,B));
    diffArray.push(LiCoPatchGenerator.Generate(B,C));
    diffArray.push(LiCoPatchGenerator.Generate(C,D));
    diffArray.push(LiCoPatchGenerator.Generate(D,E));
    diffArray.push(LiCoPatchGenerator.Generate(E,F));
    diffArray.push(LiCoPatchGenerator.Generate(F,G));
    expect(LiCoPatchApplier.ApplyAll(A,diffArray)).toBe(G);
});
test("clear_and_restore",() => {
    const A = "vec3 c = vec3(1.0,1.0,1.0);";
    const B = "";
    const C = "vec3 d = vec3(1.0,0.5,1.0);";
    let diffArray:LiCoPatchArray = new Array<LiCoPatch>();
    diffArray.push(LiCoPatchGenerator.Generate(A,B));
    diffArray.push(LiCoPatchGenerator.Generate(B,C));
    expect(LiCoPatchApplier.ApplyAll(A,diffArray)).toBe(C);
});

