/* ------------
     Console.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

namespace TSOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,

                    public commandHistory: string[] = [],
                    public commandHistoryIndex: number = 0,
                    public commandHistoryCursor: number = 0,
                    public buffer = "") {}

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        public clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        public resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }
        public clearLine(): void{
            var x = this.currentXPosition - _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.charAt(this.buffer.length-1));
            var y = this.currentYPosition - this.currentFontSize ;
            var width = 2000
            var height = this.currentFontSize + _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) + _FontHeightMargin;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { // the Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    this.commandHistory.push(this.buffer);
                    _OsShell.handleInput(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                }
                else if (chr === String.fromCharCode(8)){ //check for backspace key

                    //find the x position, y position, width and height of the last character in the buffer
                    var x = this.currentXPosition - _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.charAt(this.buffer.length-1));
                    var y = this.currentYPosition - this.currentFontSize ;
                    var width = _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.charAt(this.buffer.length-1));
                    var height = this.currentFontSize + _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) + _FontHeightMargin;

                    //move the current x position back to the last character in the buffer
                    this.currentXPosition = this.currentXPosition - _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer.charAt(this.buffer.length-1));
                    //remove the last character from the buffer
                    this.buffer = this.buffer.substring(0, this.buffer.length - 1);
                    // erase the contents of the canvas for the last character added to the canvas
                    _DrawingContext.clearRect(x,y,width,height);

                }else if(chr === String.fromCharCode(9)) { // Tab is ASCII code 9
                    //var temp = Utils.autoCompleteCommand(this.buffer, Shell.getCommandList());
                    var test = ["t", "h", "e"];
                    for(var i in test){
                            _KernelInputQueue.enqueue(test[i]);
                        }
                }
                else if (chr === String.fromCharCode(38)){ //check for up arrow key
                    if (this.commandHistory.length > 0) {
                        if (this.commandHistoryIndex > 0) {
                            this.commandHistoryIndex--;
                        }
                        _DrawingContext.clearRect(0, this.currentYPosition - this.currentFontSize, _Canvas.width, this.currentFontSize + _FontHeightMargin);
                        this.buffer = this.commandHistory[this.commandHistoryIndex];
                        this.currentXPosition = 0;
                        this.putText(_OsShell.promptStr + this.buffer);
                    }
                }
                else if(chr === String.fromCharCode(40)) { // check for down arrow key
                    if (this.commandHistory.length > 0){
                        if(this.commandHistoryIndex < this.commandHistory.length -1){
                            this.commandHistoryIndex++;
                        }
                        else{
                            this.commandHistoryIndex = this.commandHistory.length;
                            this.buffer = "";
                        }
                        _DrawingContext.clearRect(0, this.currentYPosition - this.currentFontSize, _Canvas.width, this.currentFontSize + _FontHeightMargin);
                        this.currentXPosition = 0;
                        if (this.commandHistoryIndex < this.commandHistory.length){
                            this.buffer = this.commandHistory[this.commandHistoryIndex];
                        }
                        this.currentXPosition = 0;
                        this.putText(_OsShell.promptStr + this.buffer);
                    }
                }
                else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Add a case for Ctrl-C that would allow the user to break the current program.
            }
        }

        public putText(text: string): void {
            /*  My first inclination here was to write two functions: putChar() and putString().
                Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
                between the two. (Although TypeScript would. But we're compiling to JavaScipt anyway.)
                So rather than be like PHP and write two (or more) functions that
                do the same thing, thereby encouraging confusion and decreasing readability, I
                decided to write one function and use the term "text" to connote string or char.
            */
            if (text !== "") {
                // Draw the text at the current X and Y coordinates.
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
         }

        public advanceLine(): void {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            this.currentYPosition += _DefaultFontSize + 
                                     _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                     _FontHeightMargin;

            // TODO: Handle scrolling. (iProject 1)
        }
    }
 }
