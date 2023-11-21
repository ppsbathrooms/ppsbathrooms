// Get data from db file
function getData() {
    pageID = $('#pageID').html();

    brData = $('#' + pageID + 'Data').html();
    brData = brData.toString().split(',');

    newStatus = navigator.onLine ? brData : -1;

    for (var i = 0; i < 34; i++) {
        setStatus(i, newStatus[i]);
    }
    
    $("#svgBathrooms").show(100);
}


// It's in the name dummy
function setStatus(brNumber, status) {
    if (status == 1) {
        $("#br" + brNumber.toString()).css({ fill: '#32A848'}); 
    } else if (status == 0) {
        $("#br" + brNumber.toString()).css({ fill: '#CC2825'}); 
    } else {
        $("#br" + brNumber.toString()).css({ fill: '#75B9FA'}); 
    }
}

// Also in the name (duh)
function getBrData(brNumber) {
    if(brNumber != null)
        return brData[brNumber];
    else
        return brData;
}