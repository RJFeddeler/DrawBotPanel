// Create cards for files in the file manager //
function generateFileList() {
    var fileHTML;
    for (i = 0; i < fileList.count; i++) {
        var month;
        switch (fileList.file[i].date.month) {
            case 1: month = "January"; break;
            case 2: month = "February"; break;
            case 3: month = "March"; break;
            case 4: month = "April"; break;
            case 5: month = "May"; break;
            case 6: month = "June"; break;
            case 7: month = "July"; break;
            case 8: month = "August"; break;
            case 9: month = "September"; break;
            case 10: month = "October"; break;
            case 11: month = "November"; break;
            case 12: month = "December"; break;
            default:
            	month = "Invalid";
            	break;
        }

        var drawTime = 0;
        if ((state.drawSpeed > 0) && (state.moveSpeed > 0)) {
            (fileList.file[i].lineLength / state.drawSpeed) + (fileList.file[i].moveLength / state.moveSpeed);
        }

        var formattedDate;
        if ((month === "Invalid") || (fileList.file[i].date.day < 1) || (fileList.file[i].date.day > 31)) {
            formattedDate = "Invalid Date!";
        } else {
            formattedDate = month + " " + fileList.file[i].date.day + ", " + fileList.file[i].date.year;
        }

        fileHTML =  '<div id="file">' +
                        '<div class="card">' +
                            '<span class="display-shortcuts">' +
                                '<div class="thumb" style="background-image: url(\'images/preview/' + fileList.file[i].image + '\')"></div>' +
                                '<div class="shortcut">' +
                                    '<a href="#" id="file-copy-' + (i + 1) + '"><i class="fa fa-clone fa-md fa-fw"></i></a>' +
                                    '<a href="#" id="file-refactor-' + (i + 1) + '"><i class="fa fa-cogs fa-md fa-fw"></i></a>' +
                                    '<a href="#" id="file-rename-' + (i + 1) + '"><i class="fa fa-i-cursor fa-md fa-fw"></i></a>' +
                                    '<a href="#" id="file-delete-' + (i + 1) + '"><i class="fa fa-trash fa-md fa-fw"></i></a>' +
                                '</div>' +
                            '</span>' +
                            '<h4>' + fileList.file[i].fname + '</h4>' +
                            '<hr/>' +
                            '<p class="descrip1">' + fileList.file[i].width + 'mm x ' + fileList.file[i].height + 'mm</p>' +
                            '<p class="descrip1">' + formattedDate + '</p>' +
                            '<p class="descrip1">' + fileList.file[i].fileSize + 'MB</p>' +
                            '<hr/>' +
                            '<p class="descrip2">Drawing Time: ' + drawTime +' Min</p>' +
                            '<button type="button" class="btn btn-outline-primary btn-draw">Draw!</button>' +
                        '</div>' +
                    '</div>';

        $("#file-container").append(fileHTML);
    }
}

function spawnFileShortcutPopovers() {
    for (i = 1; i <= fileList.count; i++) {
        $('#file-copy-' + i).popover({ html: true, content: "<font color='white'>Copy</font>", trigger: 'hover', placement:'bottom' })
        $('#file-refactor-' + i).popover({ html: true, content: "<font color='white'>Refactor</font>", trigger: 'hover', placement:'bottom' })
        $('#file-rename-' + i).popover({ html: true, content: "<font color='white'>Rename</font>", trigger: 'hover', placement:'bottom' })
        $('#file-delete-' + i).popover({ html: true, content: "<font color='white'>Delete</font>", trigger: 'hover', placement:'bottom' })
    }
}