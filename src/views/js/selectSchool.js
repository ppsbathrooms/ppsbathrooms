function selectSchool(school) {
    console.log(school)

    document.getElementsByClassName("schoolButtons")[0].style.display = "none";

    getDataForUpdate();
    getData();
    loadMap();
    setupButtons();
}
