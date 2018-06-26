var lista = document.getElementById("lista");
var pyynto = new XMLHttpRequest();
pyynto.onreadystatechange = function () {
    if (pyynto.readyState === 4) {
        if (pyynto.status === 200) {
            var tulos = JSON.parse(pyynto.responseText);
            console.dir(tulos);
            junienTulokset(tulos);
        }
    }
};
//hakee kaikki junat, olisi hyvä, jos saisi valittua haluaako lähi- vai kaukojunan
//näyttää myös vain saapumisajan määränpäähän(?), ei valitulle pääteasemalle
//ei kaikkia
function junienTulokset(tulos) {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    var optiot = {hour: '2-digit', minute: '2-digit', hour12: false}; //kohtia Tommin koodista
    for (var i = 0; i < document.getElementById("lukumaara").value; ++i) {
        var elem = document.createElement("tr");
        var juna = tulos[i];
        var lahtoaika = new Date(juna.timeTableRows[0].scheduledTime).toLocaleTimeString("fi", optiot);
        var saapumisaika = new Date(juna.timeTableRows[juna.timeTableRows.length - 1].scheduledTime).toLocaleTimeString("fi", optiot);
        elem.appendChild(document.createTextNode(juna.trainCategory + ": " + juna.trainType + juna.trainNumber + ", lähtee: " + lahtoaika + " saapuu: " + saapumisaika));
        lista.appendChild(elem);
    }
}
function haedata() {
    var alku ="https://rata.digitraffic.fi/api/v1";
    var keski = "/live-trains/station/";
    var viimeinen = "/";
    var lahtoasema = document.getElementById("lahtoasema").value;
    var paateasema = document.getElementById("paateasema").value;
    pyynto.open('get', alku + keski + lahtoasema + viimeinen + paateasema);
    console.log(alku + keski + lahtoasema + viimeinen + paateasema);
    pyynto.send();
}

