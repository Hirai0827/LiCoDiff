export namespace TestRandom {
    export const GenerateRandomChar:() => string = () => {
        return String.fromCharCode(('a').charCodeAt(0) + Math.floor(Math.random() * 26));
    };
    export const GenerateRandomSentence = (l:number) => {
        let str = "";
        for (let i = 0; i < l; i++){
            str += GenerateRandomChar();
        }
        console.log(str);
        return str;
    }
};
