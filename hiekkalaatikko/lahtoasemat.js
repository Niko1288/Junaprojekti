var lahtoasema = document.getElementById("lahtoasema");
var asemahaku = new XMLHttpRequest();
asemahaku.onreadystatechange = function () {
    if (asemahaku.readyState === 4 && asemahaku.status === 200) {
        var tulokset = JSON.parse(asemahaku.responseText);
        console.dir(tulokset);
        lajitteleAsemat(tulokset);
    }
};

function lajitteleAsemat(tulokset) {
    for (var i = 0; i < tulokset.length; ++i) {
        var asema = tulokset[i];
        var tunnus = asema.stationShortCode;
        var kokonimi = asema.stationName;
        var elementti = document.createElement("option");
        elementti.setAttribute("value", tunnus);
        elementti.text=kokonimi;
        var elementti2 = document.createElement("option");
        elementti2.setAttribute("value", tunnus);
        elementti2.text=kokonimi;
        lahtoasema.appendChild(elementti);
        paateasema.appendChild(elementti2);
    }
}

function haeAsemat() {
    asemahaku.open('get', "https://rata.digitraffic.fi/api/v1/metadata/stations");
    console.log("https://rata.digitraffic.fi/api/v1/metadata/stations");
    asemahaku.send();
}
haeAsemat();