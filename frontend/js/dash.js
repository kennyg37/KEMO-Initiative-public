var tabmenu = document.getElementsByClassName('tab-menu');
var tabcontent = document.getElementsByClassName('main-content');

function openmenu(tab) {
    console.log(tab);
    let selectedTab = document.getElementById(tab);
    if (selectedTab) {
        console.log("Element with ID " + tab + " found.");
    } else {
        console.log("Element with ID " + tab + " not found.");
    }
    for (tab of tabmenu) {
        tab.classList.remove("active");
    }
    for (content of tabcontent) {
        content.classList.remove("main-default");
    }
    event.currentTarget.classList.add('active');
    selectedTab.classList.add('main-default');
    if (selectedTab.classList.contains('main-default')) {
        console.log("success");
    } else {
        console.log("failed");
    }
}