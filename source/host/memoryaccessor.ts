namespace TSOS {
    export class MemoryAccessor {
        constructor(public memory: Memory, 
                    public segment: number,
                    public base: number,
                    public limit: number,
        ) { }


            writeImmediate(address, value) {
            this.setMAR(address);
            this.setMDR(value);
            _Memory.write(0); // base needs to be 0 when writing a whole program
        }

        flashMemory(program, segment) {
            const base = segment * 0x100;
            const startingAddress = base;
   
            const originalMAR = this.getMAR();
            for (let i = 0; i < program.length; i++) {
                this.writeImmediate(startingAddress + i, program[i]); 
            }
   
            for (let i = program.length; i < 0x100; i++) {
                this.writeImmediate(base + i, 0);
            }

            this.setMAR(originalMAR);

            this.setMAR(originalMAR);
            TSOS.Control.updateMemory();
        }


            }
        }