const schoolData = JSON.parse($("#school-data").attr("data-schools"));

const greenColor = "#036F3E";
const redColor = "#D40028";

const schools = {
  franklin: "fhs",
  cleveland: "chs",
  ida: "ihs",
};

// change stroke width per school
// for different svg sizes
const strokeWidths = {
  franklin: "2px",
  cleveland: "6px",
  ida: "2px",
};

const data = {};
const modifiedData = {};

// process school data
Object.keys(schoolData.schools).forEach((school) => {
  data[school] = schoolData.schools[school].bathrooms.join(",");
  modifiedData[school] = schoolData.schools[school].bathrooms.join(",");
});

var currentSchool = "franklin";

function hasChanges() {
  for (const school in modifiedData) {
    const originalData = data[school].split(",");
    const modifiedSchoolData = modifiedData[school].split(",");

    for (let i = 0; i < originalData.length; i++) {
      if (originalData[i] !== modifiedSchoolData[i]) {
        return true;
      }
    }
  }
  return false;
}

function updateSubmitButtonVisibility() {
  if (hasChanges()) {
    $("#submit").show();
  } else {
    $("#submit").hide();
  }
}

function resetBathroomStatus() {
  $("#icon-holder rect[data-number]").each(function () {
    const number = +$(this).data("number");
    const currentStatus = modifiedData[currentSchool].split(",")[number];

    const color = currentStatus === "1" ? greenColor : redColor;
    $(this)
      .css({
        fill: color,
        stroke: "none",
      })
      .attr("data-original-status", currentStatus)
      .attr("data-current-status", currentStatus);
  });

  $("#submit").hide();
}

$("#submit").hide();

setMap("franklin");

// school switching
$("#side-panel p").on("click", function () {
  $("#side-panel p").removeClass("selected");
  $(this).addClass("selected");

  const id = $(this).attr("id");
  const school = id.replace("-select", "");
  setMap(school);
});

function setBathroomStatus(brData) {
  const brDataArray = brData.split(",");

  $("#icon-holder rect[data-number]").each(function () {
    const number = +$(this).data("number");
    const originalStatus = brDataArray[number];
    const currentStatus = modifiedData[currentSchool]
      ? modifiedData[currentSchool].split(",")[number]
      : originalStatus;

    if (!currentStatus) return;

    const color = currentStatus === "1" ? greenColor : redColor;
    $(this)
      .css("fill", color)
      .attr("data-original-status", originalStatus)
      .attr("data-current-status", currentStatus);

    if (currentStatus !== originalStatus) {
      $(this).css({
        stroke: "white",
        "stroke-width": strokeWidths[currentSchool],
      });
    } else {
      $(this).css("stroke", "none");
    }
  });

  updateSubmitButtonVisibility();
}

function getCurrentData() {
  // format data to match server-side expected format
  const updatedData = {};
  for (const school in modifiedData) {
    updatedData[school] = modifiedData[school]
      .split(",")
      .map((status) => parseInt(status));
  }
  return updatedData;
}

function setMap(school) {
  currentSchool = school;
  fetch("/html/maps/" + schools[school] + "Map.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      return response.text();
    })
    .then((map) => {
      $("#map").html(map);

      $("footer").css("opacity", 0).animate({ opacity: 1 }, 250);
      setBathroomStatus(data[school]);

      $("#icon-holder")
        .off("click")
        .on("click", "rect", function () {
          const $icon = $(this);
          const currentStatus = $icon.attr("data-current-status");
          const originalStatus = $icon.attr("data-original-status");

          const newStatus = currentStatus === "1" ? "0" : "1";
          $icon.attr("data-current-status", newStatus);

          $icon.css("fill", newStatus === "1" ? greenColor : redColor);

          if (newStatus !== originalStatus) {
            $icon.css({
              stroke: "white",
              "stroke-width": strokeWidths[currentSchool],
            });
          } else {
            $icon.css("stroke", "none");
          }

          const brDataArray = modifiedData[currentSchool]
            ? modifiedData[currentSchool].split(",")
            : data[currentSchool].split(",");

          const number = +$icon.data("number");
          brDataArray[number] = newStatus;
          modifiedData[currentSchool] = brDataArray.join(",");

          updateSubmitButtonVisibility();
        });
    })
    .catch((error) => {
      console.error("there was a problem fetching the document:", error);
      return null;
    });
}

$("#submit").on("click", function () {
  const dataToSubmit = getCurrentData();

  const $submitButton = $("#submit");
  $submitButton.prop("disabled", true).css("opacity", "0.5");

  // send data to server
  $.ajax({
    url: "/update-bathrooms",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(dataToSubmit),
    success: function (response) {
      // update original data to match modified data
      for (const school in modifiedData) {
        data[school] = modifiedData[school];
      }

      // reset the current school's view
      resetBathroomStatus();

      $submitButton.prop("disabled", false).css("opacity", "1");

      alert("Bathroom status updated successfully!");
    },
    error: function (xhr, status, error) {
      $submitButton.prop("disabled", false).css("opacity", "1");

      alert("Failed to update bathroom status. Please try again.");
      console.error("Submission error:", error);
    },
  });
});
