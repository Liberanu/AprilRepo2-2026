/* ----------------------------------
   DeviceDriverKeyboard.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    // Extends DeviceDriver
    class DeviceDriverKeyboard extends TSOS.DeviceDriver {
        constructor() {
            // Override the base method pointers.
            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            // So instead...
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }
        krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }
        krnKbdDispatchKeyPress(params) {
            // Parse the params.  TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if(keyCode == 8){
                chr = String.fromCharCode(66);
                _KernelInputQueue.enqueue(chr);
                chr = String.fromCharCode(65);
                _KernelInputQueue.enqueue(chr);
                chr = String.fromCharCode(67);
                _KernelInputQueue.enqueue(chr);
                chr = String.fromCharCode(75);
                _KernelInputQueue.enqueue(chr);
                chr = String.fromCharCode(32);
                _KernelInputQueue.enqueue(chr);
            } // backspace check
            else if(keyCode == 9){ // check for tab
                chr = String.fromCharCode(32)
                for(let i=0; i<=4;i++){
                _KernelInputQueue.enqueue(chr);
                } // replace this with algorithm to check if only 1 command matches the entered characters

            }
            else if ((keyCode >= 65) && (keyCode <= 90)) { // letter
                if (isShifted === true) {
                    chr = String.fromCharCode(keyCode); // Uppercase A-Z
                }
                else {
                    chr = String.fromCharCode(keyCode + 32); // Lowercase a-z
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            }
            else if (((keyCode >= 48) && (keyCode <= 57)) || // digits
                (keyCode == 32) || // space
                (keyCode == 13)) { // enter
                    if (isShifted === false){
                    chr = String.fromCharCode(keyCode);
                    _KernelInputQueue.enqueue(chr);
                    }
                    else{
                        if (keyCode == 48){chr = String.fromCharCode(41);}
                        else if (keyCode == 49){chr = String.fromCharCode(33);}
                        else if (keyCode == 50){chr = String.fromCharCode(64);}
                        else if (keyCode == 51){chr = String.fromCharCode(35);}
                        else if (keyCode == 52){chr = String.fromCharCode(36);}
                        else if (keyCode == 53){chr = String.fromCharCode(37);}
                        else if (keyCode == 54){chr = String.fromCharCode(94);}
                        else if (keyCode == 55){chr = String.fromCharCode(38);}
                        else if (keyCode == 56){chr = String.fromCharCode(42);}
                        else if (keyCode == 57){chr = String.fromCharCode(40);}
                    _KernelInputQueue.enqueue(chr);
                    }
            }
            else {// all other symbols
                if(isShifted === false){ // not shifted
                    if(keyCode == 189){chr = String.fromCharCode(45);} // -
                    if(keyCode == 187){chr = String.fromCharCode(61);} // =
                    if(keyCode == 220){chr = String.fromCharCode(95);} // \
                    if(keyCode == 219){chr = String.fromCharCode(91);} // [
                    if(keyCode == 221){chr = String.fromCharCode(93);} // ]
                    if(keyCode == 186){chr = String.fromCharCode(59);} // ;
                    if(keyCode == 222){chr = String.fromCharCode(39);} // '
                    if(keyCode == 188){chr = String.fromCharCode(44);} // ,
                    if(keyCode == 190){chr = String.fromCharCode(46);} // .
                    if(keyCode == 191){chr = String.fromCharCode(47);} // /

                }
                else{ // shifted
                    if(keyCode == 189){chr = String.fromCharCode(95);} // _
                    if(keyCode == 187){chr = String.fromCharCode(43);} // +
                    if(keyCode == 220){chr = String.fromCharCode(124);} // |
                    if(keyCode == 219){chr = String.fromCharCode(123);} // {
                    if(keyCode == 221){chr = String.fromCharCode(125);} // }
                    if(keyCode == 186){chr = String.fromCharCode(58);} // :
                    if(keyCode == 222){chr = String.fromCharCode(34);} // "
                    if(keyCode == 188){chr = String.fromCharCode(60);} // <
                    if(keyCode == 190){chr = String.fromCharCode(62);} // >
                    if(keyCode == 191){chr = String.fromCharCode(63);} // ?
                }
                _KernelInputQueue.enqueue(chr);
            }

            
        }
    }
    TSOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverKeyboard.js.map