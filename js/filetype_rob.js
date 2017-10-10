function assertROBHeader(extension, header) {
    if (extension.toLowerCase() === 'rob') {
        if (header[0].toLowerCase() === 'c00') {
            return true;
        }
    }

    return false;
}

function assertROBCommand(line) {
    if (line[line.length-1] === 'STOP')
        return false;

    if (line.indexOf("START") < 0)
        return false;

    return true;
}

// Format:      Command(Arm), *([Setting][, value], ), START, *([point X], [point Y], ), STOP
// Example:     C12(0), START, 0, 0, 1, 0, 1, 1, 0, 1, STOP
//
// Command:     C00: File Header
//              C10(x): Line | C11: Line List | C12: Polygon | C13: Ellipse | C14: Arc | C15: Text
//              C20(x): Fill Previous Shape with Arm x (valid for Polygon, Ellipse, and Text) 
//
// Protocol:    START: Beginning of Location Data | STOP: End of Location Data
//
// Settings:    S00: Title | S01: Format Version | S02: File Creation Date | S03: Sorting Algorithm | S04: Comment
//              S10: Absolute Position (Default) | S11: Relative Position
//              S20: Fill Solid | S21: Fill Vertical Stripes | S22: Fill Horizontal Stripes | S23: Fill Diagonal Stripes | S24: Fill X Stripes | S25: Fill + Stripes
//
//              S30: Font Name | S31: Font Size | S32: Font Bold | S33: Font Italics | S34: Font Underline | S35: Font Crossed Out
function getCommandInfo(cmd, position, cmd_start) {
    var validROBCommands = [    'c00', 
                                'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 
                                'c20'];
    var validROBProtocol = [    'START', 'STOP'];
    var validROBSettings = [    's00', 's01', 's02', 's03', 's04', 
                                's10', 's11', 
                                's20', 's21', 's22', 's23', 's24', 's25', 
                                's30', 's31', 's32', 's33', 's34', 's35'];

    if (position === 0) {
        if (validROBCommands.indexOf(cmd.toLowerCase()) < 0) {
            return -1;
        }
    } else {
        if (validROBCommands.indexOf(cmd.toLowerCase()) >= 0) {
            return -1;
        }
    }
}