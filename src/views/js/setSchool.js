chrome.storage.local.get(["school"]).then((result) => {
    school = result.school;
    if (school == undefined)
        school = "none";
    if(school != "none") {
        window.location.replace(school + ".html");
    }
});

$(".cleveland").click(function(){
    chrome.storage.local.set({ school: "chs" });
    window.location.replace("chs.html");
});

$(".franklin").click(function(){
    chrome.storage.local.set({ school: "fhs" });
    window.location.replace("fhs.html");
});

$(".ida").click(function(){
    chrome.storage.local.set({ school: "ihs" });
    window.location.replace("ihs.html");
});