import diff from "fast-diff";
import {TestRandom} from "./TestRandom";

test("sample",() => {
    expect(1 + 2).toBe(3);
});
test("diff_sample",() => {
    const len = 10000;
    const iter = 10000;
    let prev = TestRandom.GenerateRandomSentence(len);
    let current = prev;
    console.log(prev);
    for(let i = 0; i < iter; i++){
        const targetIndex = Math.floor(Math.random() * (len - 1));
        current = current.substring(0,targetIndex) +TestRandom.GenerateRandomChar()+ current.substring(targetIndex + 1,len);
        //console.log(diff(prev,current));
        prev = current;
    }
    expect(true).toBe(true);
});
