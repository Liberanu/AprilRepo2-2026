namespace TSOS {
    export class MemoryManager {
        memoryAvailability: Boolean[] = [];
        constructor(public memory: Memory) { 
            this.memoryAvailability = [];
            this.init();
        }
        
        init(){
            this.memoryAvailability.push(true);
            this.memoryAvailability.push(true);
            this.memoryAvailability.push(true);
        }
        isSpaceAvailable() {
            for (let i = 0; i < this.memoryAvailability.length; i++) {
                if (this.memoryAvailability[i] === true) {
                    this.allocateSegment(i); 
                    _CurrentMemorySegment = i;
                    return true;
                }
            }
            return false; 
        }
        allocateSegment(index: number) {
            this.memoryAvailability[index] = false; 
        }
        deallocateSegment(segment: number) {
            this.memoryAvailability[segment] = true; 
            const pcb = PCBManager.getPCBBySegment(segment);
            if (pcb) {
                _PCBManager.updatePCBState(pcb, "Terminated");
            }
        }
        clearMemory() {
            for (let i = 0; i < this.memoryAvailability.length; i++) {
                this.memoryAvailability[i] = true;
            }
            _Memory.reset();
            TSOS.Control.updateMemoryTable();
            _PCBManager.clearAllPCBs();

        }

    }
}