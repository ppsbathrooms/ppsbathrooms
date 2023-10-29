function selectSchool(school) {
    $(".schoolChoice").hide();

    $("#pageID").html(school);

    loadMap();

    $("#svgBathrooms").show(100);
    getData();

    getDataForUpdate();
    
    setupButtons();
}
