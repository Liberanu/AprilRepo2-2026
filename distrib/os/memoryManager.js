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
        isSpaceAvailable() {
            for (let i = 0; i < this.memoryAvailability.length; i++) {
                if (this.memoryAvailability[i] === true) {
                    this.allocateSegment(i); // sets the segment to the first available spot
                    _CurrentMemorySegment = i;
                    return true;
                }
            }
            return false; // nothing was availble
        }
        allocateSegment(index) {
            this.memoryAvailability[index] = false; // segment now off limits
        }
    }
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memoryManager.js.map