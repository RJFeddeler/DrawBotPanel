function spawnNavPopovers() {
	$('#nav-home').popover({ html: true, content: "<font color='white'>Home</font>", trigger: 'hover', placement:'bottom' })
    $('#nav-draw').popover({ html: true, content: "<font color='white'>Draw</font>", trigger: 'hover', placement:'bottom' })
    $('#nav-upload').popover({ html: true, content: "<font color='white'>Upload</font>", trigger: 'hover', placement:'bottom' })
    $('#nav-wifi').popover({ html: true, content: "<font color='white'>WiFi</font>", trigger: 'hover', placement:'bottom' })
    $('#nav-settings').popover({ html: true, content: "<font color='white'>Settings</font>", trigger: 'hover', placement:'bottom' })
}