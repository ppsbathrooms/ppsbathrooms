var request = makeHttpObject();
request.open("GET", "https://www.ppsbathrooms.org/" + $("#pageID").html() + "data.json", true);
request.send(null);
request.onreadystatechange = function() {
    if (request.readyState == 4) {
        brData = request.responseText;
        brData.length = 1; 
        brData = brData.toString().split(','); 

        if (navigator.onLine) {newStatus = brData}
        else {
            newStatus = -1;
            noWifi();
        }

        for (var i = 0; i < 14; i++) {
            setStatus(i, newStatus[i]);
        }

        $("#svgBathrooms").fadeIn(100);
    }
};

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

function setStatus(brNumber, status) {
    if (status == 1) {
        $("#br" + brNumber.toString()).css({ fill: '#32A848'}); 
    } else if (status == 0) {
        $("#br" + brNumber.toString()).css({ fill: '#CC2825'}); 
    } else {
        $("#br" + brNumber.toString()).css({ fill: '#75B9FA'}); 
    }

}

function getBrData(brNumber) {
    if(brNumber != null)
        return brData[brNumber];
    else
        return brData;
}

function noWifi() {
    $('#noInternet').show();
    $('#noInternetGlow').show();
    showError('no internet connection');
}

function showError(error) {
    $('#errorMessage').show();
    $('#errorMessage').html('ERROR: ' + error);
}