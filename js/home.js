// Fill in data from state object //
function fillStateData() {
    document.getElementById("idRobotState").innerHTML = (RobotStateEnum.properties[state.robotState] === undefined ? "&nbsp" : RobotStateEnum.properties[state.robotState].display);
    document.getElementById("idRobotState").style.color = (RobotStateEnum.properties[state.robotState] === undefined ? "#007bff" : RobotStateEnum.properties[state.robotState].color);
    document.getElementById("idDrawingSpeed").innerHTML = (state.drawSpeed == "" ? "&nbsp" : state.drawSpeed);
    document.getElementById("idMovementSpeed").innerHTML = (state.moveSpeed == "" ? "&nbsp" : state.moveSpeed);
    document.getElementById("idPrintAreaWidth").innerHTML = (state.printAreaWidth == "" ? "&nbsp" : state.printAreaWidth);
    document.getElementById("idPrintAreaSeparator").innerHTML = (state.printAreaWidth == "" ? "&nbsp" : "x");
    document.getElementById("idPrintAreaHeight").innerHTML = (state.printAreaHeight == "" ? "&nbsp" : state.printAreaHeight);

    document.getElementById("idMemCardType").innerHTML = (MemCardTypeEnum.properties[state.memCardType] === undefined ? "&nbsp" : MemCardTypeEnum.properties[state.memCardType].display);
    document.getElementById("idMemCardLabel").innerHTML = (state.memCardLabel == "" ? "&nbsp" : state.memCardLabel);
    document.getElementById("idMemCardCapacity").innerHTML = (state.memCardCapacity == "" ? "&nbsp" : state.memCardCapacity);
    document.getElementById("idMemCardUsedSpace").innerHTML = (((state.memCardCapacity == "") || (state.memCardFreeSpace == "")) ? "&nbsp" : (state.memCardCapacity - state.memCardFreeSpace));
    document.getElementById("idMemCardFreeSpace").innerHTML = (state.memCardFreeSpace == "" ? "&nbsp" : state.memCardFreeSpace);

    document.getElementById("idWifiStatus").innerHTML = (WifiStatusEnum.properties[state.wifiStatus] === undefined ? "&nbsp" : WifiStatusEnum.properties[state.wifiStatus].display);
    document.getElementById("idWifiStatus").style.color = (WifiStatusEnum.properties[state.wifiStatus] === undefined ? "#007bff" : WifiStatusEnum.properties[state.wifiStatus].color);
    document.getElementById("idWifiMode").innerHTML = (WifiModeEnum.properties[state.wifiMode] === undefined ? "&nbsp" : WifiModeEnum.properties[state.wifiMode].display);
    document.getElementById("idWifiSSID").innerHTML = (state.wifiSSID == "" ? "&nbsp" : state.wifiSSID);
    document.getElementById("idWifiSignalStrength").innerHTML = (state.wifiSignalStrength == "" ? "&nbsp" : state.wifiSignalStrength);
    document.getElementById("idWifiSecurity").innerHTML = (WifiSecurityEnum.properties[state.wifiSecurity] === undefined ? "&nbsp" : WifiSecurityEnum.properties[state.wifiSecurity].display);
    document.getElementById("idWifiDHCP").innerHTML = (BooleanEnum.properties[state.wifiDHCP] === undefined ? "&nbsp" : BooleanEnum.properties[state.wifiDHCP].display_alt1);
    document.getElementById("idWifiDHCP").style.color = (BooleanEnum.properties[state.wifiDHCP] === undefined ? "#007bff" : BooleanEnum.properties[state.wifiDHCP].color);
    document.getElementById("idWifiIP").innerHTML = (state.wifiIP == "" ? "&nbsp" : state.wifiIP);
    document.getElementById("idWifiNetmask").innerHTML = (state.wifiNetmask == "" ? "&nbsp" : state.wifiNetmask);
    document.getElementById("idWifiGateway").innerHTML = (state.wifiGateway == "" ? "&nbsp" : state.wifiGateway);
}

// Insert value unit types //
function fillStateUnits() {
    var elements = document.getElementsByClassName("unit-percent");
    var count = elements.length;
    for (i = 0; i < count; i++) { elements[i].innerHTML = "<small>%</small>"; }

    elements = document.getElementsByClassName("unit-length");
    count = elements.length;
    for (i = 0; i < count; i++) { elements[i].innerHTML = "<small>mm</small>"; }

    elements = document.getElementsByClassName("unit-speed");
    count = elements.length;
    for (i = 0; i < count; i++) { elements[i].innerHTML = "<small>mm/s</small>"; }

    elements = document.getElementsByClassName("unit-storage");
    count = elements.length;
    for (i = 0; i < count; i++) { elements[i].innerHTML = "<small>MB</small>"; }
}