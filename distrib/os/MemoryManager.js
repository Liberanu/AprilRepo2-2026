"use strict";
var TSOS;
(function (TSOS) {
    class MemoryManager {
        memory;
        memoryAvailability = [];
        constructor(memory) {
            this.memory = memory;
            this.memoryAvailability = [];
            this.init();
        }
        init() {
            this.memoryAvailability.push(true);
            this.memoryAvailability.push(true);
            this.memoryAvailability.push(true);
        }
    }
    TSOS.MemoryManager = MemoryManager;
    function isSpaceAvailable() {
        for (let i = 0; i < this.memoryAvailability.length; i++) {
            if (this.memoryAvailability[i] === true) {
                this.allocateSegment(i);
                _CurrentMemorySegment = i;
                return true;
            }
        }
        return false;
    }
    allocateSegment(index, number);
    {
        this.memoryAvailability[index] = false;
    }
})(TSOS || (TSOS = {}));
//# sourceMappingURL=MemoryManager.js.map