const data = JSON.parse($(".schoolData").html());

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
  franklin: "1px",
  cleveland: "5px",
  ida: "1px",
};

// save modified data across school switches
const modifiedData = { ...data };
var currentSchool;

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
}

function getCurrentData() {
  return { ...modifiedData };
}

// Click toggle logic
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

          // Toggle status
          const newStatus = currentStatus === "1" ? "0" : "1";
          $icon.attr("data-current-status", newStatus);

          // Update color
          $icon.css("fill", newStatus === "1" ? greenColor : redColor);

          // border
          if (newStatus !== originalStatus) {
            $icon.css({
              stroke: "white",
              "stroke-width": strokeWidths[currentSchool],
            });
          } else {
            $icon.css("stroke", "none");
          }

          // Update modifiedData
          const brDataArray = modifiedData[currentSchool]
            ? modifiedData[currentSchool].split(",")
            : data[currentSchool].split(",");

          const number = +$icon.data("number");
          brDataArray[number] = newStatus;
          modifiedData[currentSchool] = brDataArray.join(",");
        });
    })
    .catch((error) => {
      console.error("there was a problem fetching the document:", error);
      return null;
    });
}

$("#submit").on("click", function () {
  console.log("Current Data:", JSON.stringify(getCurrentData()));
});
