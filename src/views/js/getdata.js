// Get data from db file
function getData() {
  pageID = $("#pageID").html();

  brData = $("#" + pageID + "Data").html();
  brData = brData.toString().split(",");

  newStatus = navigator.onLine ? brData : -1;

  for (var i = 0; i < 34; i++) {
    setStatus(i, newStatus[i]);
  }

  $("#svgBathrooms").show(100);
}

function getLastUpdated() {
  var times = {};
  rawTimes = JSON.parse($("#lastUpdated").html().toString());
  pageID = $("#pageID").html();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
  }

  Object.entries(rawTimes).forEach(([school, time]) => {
    const formattedTime = formatDate(time);
    times[school] = formattedTime;
  });

  $("#lastUpdatedDisplay").html(`Last Updated ${times[pageID]}`);
}

// It's in the name dummy
function setStatus(brNumber, status) {
  if (status == 1) {
    $("#br" + brNumber.toString()).css({ fill: "#32A848" });
  } else if (status == 0) {
    $("#br" + brNumber.toString()).css({ fill: "#CC2825" });
  } else {
    $("#br" + brNumber.toString()).css({ fill: "#75B9FA" });
  }
}

// Also in the name (duh)
function getBrData(brNumber) {
  if (brNumber != null) return brData[brNumber];
  else return brData;
}
