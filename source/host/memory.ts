module TSOS {
    export class Memory{
        mainMemory: string[] = [];
        constructor(public memoryArray: string[] = []){
            this.mainMemory = mainMemory;

        }
        init(){
            this.reset();
        }
        reset(){
            for (let i = 0x00; i < 768; i++){
                this.mainMemory[i] = "0x00";
            }
        }
    }
    TSOS.Memory = new Memory();
}(TSOS || (TSOS = {})); 