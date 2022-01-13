var initList = [];
window.onload = function () {
    initList.forEach(function (item, index) {
        LogMsg(`Initializing-Number${index}`)
        item();
    });
}