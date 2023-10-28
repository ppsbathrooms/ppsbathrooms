function selectSchool(school) {
    console.log(school)

    document.getElementsByClassName("schoolButtons")[0].style.display = "none";

    document.getElementById("pageID").innerHTML = school;

    getDataForUpdate();
    getData();
    loadMap();
    setupButtons();
}
