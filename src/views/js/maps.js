const school = $("#school").html();
const bathroomData = $("#bathroomData").html();

const greenColor = "#036F3E";
const redColor = "#D40028";

const schoolData = {
  franklin: {
    school: "franklin",
    title: "Franklin",
    map: "fhs",
  },
  cleveland: {
    school: "cleveland",
    title: "Cleveland",
    map: "chs",
  },
  ida: {
    school: "ida",
    title: "Ida B Wells",
    map: "ihs",
  },
};

function setBathroomStatus() {
  const brDataArray = bathroomData.split(",");

  $("#icon-holder rect[data-number]").each(function () {
    const number = +$(this).data("number");
    const color = brDataArray[number] === "1" ? greenColor : redColor;
    $(this).css("fill", color);
  });
}

setSchoolData();

function setSchoolData() {
  data = schoolData[school];
  $("#schoolTitle h1").text(data.title);
  $(`#${data.school}-header`).addClass("header-selected");
  setMap(data.map);
}

function setMap(map) {
  fetch("/html/maps/" + map + "Map.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      $("#map").html(data);

      // fade in footer to ensure it doesn't show before map is loaded
      $("footer").css("opacity", 0).animate({ opacity: 1 }, 250);
      setBathroomStatus();
    })
    .catch((error) => {
      console.error("there was a problem fetching the document:", error);
      return null;
    });
}
