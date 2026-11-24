namespace TSOS {
    export class PCBManager {
        public nextPID: number = 0;
        public pcbReadyQueue: PCB[] = [];
        public pcbQueue: PCB[] = [];
        constructor() { }
            this.nextPID = 0
            this.pcbreadyQueue: PCB[] = [];
            this.pcbQueue: PCB[] = [];
    }

    function createPCB(priority: PCB) {
        const pcb = new TSOS.ProcessControlBlock();
        pcb.init(this.nextPID);
        pcb.priority = priority;
        this.nextPID++;
        this.pcbReadyQueue.push(pcb);
        return pcb;

    }
    function findPCBByPID(segment: number): PCB | null {
        return this.pcbQueue.find(pcb => pcb.segment === segment) || null;
    }
    function updatePCBStatus(pid: Number, status: String) {
        const pcb = this.pcbQueue.find(pcb => pcb.pid === pid);
        if (pcb) {
            pcb.state = status;
            if (status === "Terminated") {
                this.pcbQueue = this.pcbQueue.filter(p => p.pid !== pid);
            }   
            if (status === "Ready") {
                this.pcbReadyQueue.push(pcb);
            }
            else{
                this.pcbReadyQueue = this.pcbReadyQueue.filter(p => p.pid !== pid);
            }
        }
    }
    function updatePCBSegment(pid: number, Segment: number){
        const pcb = this.findPCBByPID(pid);
        pcb.updatePCBbaseAndLimit(Segment);
    }
    function updatePCBAFterDeallocation(segment: number){
        const pcb = this.findPCBByPID(segment);
        if (pcb) {
            pcb.state = "Terminated";
            this.pcbQueue = this.pcbQueue.filter(p => p.segment !== segment);
            this.pcbReadyQueue = this.pcbReadyQueue.filter(p => p.segment !== segment);
        }
    }
    

}
