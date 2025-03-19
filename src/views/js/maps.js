const school = $("#school").html();

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

setSchoolData();
function setSchoolData() {
  data = schoolData[school];
  console.log(data);

  $("#schoolTitle h1").text(data.title);
  $(`#${data.school}-header`).addClass("header-selected");
  setMap(data.map);
}

function setMap(map) {
  console.log("setting map");
  fetch("/html/maps/" + map + "Map.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      $("#map").html(data);
      console.log(map + " map set");
    })
    .catch((error) => {
      console.error("there was a problem fetching the document:", error);
      return null;
    });
}
