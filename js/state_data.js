var state = {
    robotState:0,
    drawSpeed:0,
    moveSpeed:0,
    printAreaWidth:0,
    printAreaHeight:0,
    memCardType:0,
    memCardLabel:"",
    memCardCapacity:0,
    memCardFreeSpace:0,
    wifiStatus:0,
    wifiMode:0,
    wifiSSID:"",
    wifiSignalStrength:0,
    wifiSecurity:0,
    wifiDHCP:0,
    wifiIP:"",
    wifiNetmask:"",
    wifiGateway:""
};

var RobotStateEnum = {
  OFFLINE: 1,
  ONLINE: 2,
  ERROR: 3,
  properties: {
    1: {name: "offline", value: 1, display: "Offline", color: "#ff9933"},
    2: {name: "online", value: 2, display: "Online", color: "#00bb00"},
    3: {name: "error", value: 3, display: "ERROR!", color: "#ff0000"}
  }
};

var MemCardTypeEnum = {
	NONE: 1,
	MMC: 2,
	SD: 3,
	SDHC: 4,
	UNKNOWN: 5,
	properties: {
		1: {name: "none", value: 1, display: "None"},
		2: {name: "mmc", value: 2, display: "MMC"},
		3: {name: "sd", value: 3, display: "SD"},
		4: {name: "sdhc", value: 4, display: "SDHC"},
		5: {name: "unknown", value: 5, display: "Unknown"}
	}
};

var WifiStatusEnum = {
	OFFLINE: 1,
	CONNECTING: 2,
	ONLINE: 3,
	ERROR: 4,
	properties: {
		1: {name: "offline", value: 1, display: "Offline", color: "#c0c0c0"},
		2: {name: "connecting", value: 2, display: "Connecting...", color: "#ff9933"},
		3: {name: "online", value: 3, display: "Online", color: "#00bb00"},
		4: {name: "error", value: 4, display: "ERROR!", color: "#ff0000"}
	}
};

var WifiModeEnum = {
	AP: 1,
	STA: 2,
	properties: {
		1: {name: "accesspoint", value: 1, display: "AP (Host)"},
		2: {name: "station", value: 2, display: "STA (Client)"}
	}
};

var WifiSecurityEnum = {
	OPEN: 1,
	WEP: 2,
	WPA: 3,
	WPA2: 4,
	WPA_WPA2: 5,
	properties: {
		1: {name: "open", value: 1, display: "Open"},
		2: {name: "wep", value: 2, display: "WEP"},
		3: {name: "wpa", value: 3, display: "WPA"},
		4: {name: "wpa2", value: 4, display: "WPA2"},
		5: {name: "wpa_wpa2", value: 5, display: "WPA_WPA2"}
	}
};

var BooleanEnum = {
	TRUE: 1,
	FALSE: 2,
	properties: {
		1: {name: "true", value: 1, display: "True", display_alt1: "Enabled", display_alt2: "On", color: "#00bb00"},
		2: {name: "false", value: 2, display: "False", display_alt1: "Disabled", display_alt2: "Off", color: "#cc0000"}
	}
};
