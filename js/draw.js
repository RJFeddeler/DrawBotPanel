var draw_firstShow = true;

var fileList = {
    count: 0,
    file: []
}

function fileList_GenerateList() {

}

// Create cards for files in the file manager //
function fileList_GenerateHTML() {
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

        fileHTML =  '<div class="file" id="file-' + i + '">' + 
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

var scroll_page_rows = 0;
var scroll_page_height = 0;
var scroll_current_page = 0;

function set_scroller() {
    set_scroller.top_count = 0;
    set_scroller.top1 = set_scroller.top2 = $('#file-0').offset().top;
    while (set_scroller.top2 === set_scroller.top1 ) { set_scroller.top2 = $('#file-' + ++set_scroller.top_count).offset().top; }
    scroll_page_height = $('#file-' + set_scroller.top_count).offset().top - $('#file-0').offset().top;
    scroll_page_rows = parseInt($('#file-container')[0].scrollHeight / scroll_page_height);
    console.log("scroll_page_rows: " + scroll_page_rows);
}

function scroller() {
    var page_scroll_limit = 500;
    var last_update = Date.now();
    
    $('#file-container').bind('mousewheel', function(e){
        e.preventDefault();

        var changed = false;
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < -80) {
            if ((scroll_current_page < scroll_page_rows - 1) && ((Date.now() - last_update) > page_scroll_limit)) {
                scroll_current_page++;
                changed = true;
                last_update = Date.now();
            }
        } 
        else if (e.originalEvent.wheelDelta > 80) {
            if ((scroll_current_page > 0) && ((Date.now() - last_update) > page_scroll_limit)) {
                scroll_current_page--;
                changed = true;
                last_update = Date.now();
            }
        }

        if (changed) {
            var start = $('#file-container').scrollTop();
            var delta = -(start - (scroll_current_page * scroll_page_height)) / 50;
            var curr = 1;

            var animateScroll = setInterval(function() { $('#file-container').scrollTop(start + (curr++ * delta)); }, 5);
            setTimeout(function() { clearInterval(animateScroll); $('#file-container').scrollTop(scroll_current_page * scroll_page_height); }, 250);
        }
    });
}

function spawnFileShortcutPopovers() {
    for (i = 1; i <= fileList.count; i++) {
        $('#file-copy-' + i).popover({ html: true, content: "<font color='white'>Copy</font>", trigger: 'hover', placement:'bottom' });
        $('#file-refactor-' + i).popover({ html: true, content: "<font color='white'>Refactor</font>", trigger: 'hover', placement:'bottom' });
        $('#file-rename-' + i).popover({ html: true, content: "<font color='white'>Rename</font>", trigger: 'hover', placement:'bottom' });
        $('#file-delete-' + i).popover({ html: true, content: "<font color='white'>Delete</font>", trigger: 'hover', placement:'bottom' });
    }
}

function spawnFreeDrawPopovers() {
    $('#draw_line').popover({ html: true, content: "<font color='white'>Line</font>", trigger: 'hover', placement:'bottom' });
    $('#draw_square').popover({ html: true, content: "<font color='white'>Rectangle</font>", trigger: 'hover', placement:'bottom' });
    $('#draw_circle').popover({ html: true, content: "<font color='white'>Ellipse</font>", trigger: 'hover', placement:'bottom' });
    $('#draw_htext').popover({ html: true, content: "<font color='white'>Horizontal Text</font>", trigger: 'hover', placement:'bottom' });
    $('#draw_vtext').popover({ html: true, content: "<font color='white'>Vertical Text</font>", trigger: 'hover', placement:'bottom' });
    $('#draw_pencil').popover({ html: true, content: "<font color='white'>Pencil</font>", trigger: 'hover', placement:'bottom' });
    $('#draw_undo').popover({ html: true, content: "<font color='white'>Undo</font>", trigger: 'hover', placement:'bottom' });
}