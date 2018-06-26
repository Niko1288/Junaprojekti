var lista = document.getElementById("tulos");
var pyynto = new XMLHttpRequest();
pyynto.onreadystatechange = function () {
    if (pyynto.readyState === 4 && pyynto.status === 200) {
        var tulos = JSON.parse(pyynto.responseText);
        console.dir(tulos);
        junienTulokset(tulos);
    }
};

function junienTulokset(tulos) {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    var optiot = {hour: '2-digit', minute: '2-digit', hour12: false};
    for (var i = 0; i < 10; ++i) {
        var elementti = document.createElement("li");
        var juna = tulos[i];
        var lahtoaika = new Date(juna.timeTableRows[0].scheduledTime).toLocaleTimeString("fi", optiot);
        var saapumisaika = new Date(juna.timeTableRows[juna.timeTableRows.length - 1].scheduledTime).toLocaleTimeString("fi", optiot);
        elementti.appendChild(document.createTextNode(juna.trainCategory + ": " + juna.trainType + juna.trainNumber
            + ", lähtee asemalta: " + document.getElementById("lahtoasema").value + " klo: " + lahtoaika
            + ", saapuu asemalle: " + document.getElementById("paateasema").value + " klo: " + saapumisaika));
        lista.appendChild(elementti);
    }
}

function haedata() {
    var alku ="https://rata.digitraffic.fi/api/v1/live-trains/station/";
    var vali = "/";
    var lahto = document.getElementById("lahtoasema").value;
    var paate = document.getElementById("paateasema").value;
    pyynto.open('get', alku + lahto + vali + paate);
    console.log(alku + lahto + vali + paate);
    pyynto.send();
}