"use strict";
var TSOS;
(function (TSOS) {
    class Memory {
        memoryArray;
        mainMemory = [];
        constructor(memoryArray = []) {
            this.memoryArray = memoryArray;
            this.mainMemory = mainMemory;
        }
        init() {
            this.reset();
        }
        reset() {
            for (let i = 0x00; i < 768; i++) {
                this.mainMemory[i] = "0x00";
            }
        }
    }
    TSOS.Memory = Memory;
    TSOS.Memory = new Memory();
})(TSOS || (TSOS = {}));
(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map