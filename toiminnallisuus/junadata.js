var lista = document.getElementById("tulos");
var pyynto = new XMLHttpRequest();
var lkmListalle = 5;
pyynto.onreadystatechange = function () {
    if (pyynto.readyState === 4 && pyynto.status === 200) {
        var tulos = JSON.parse(pyynto.responseText);
        console.dir(tulos);
        /*console.dir(typeof pyynto.responseText);
        console.dir(pyynto.responseText);
        if (pyynto.responseText.contains("")) {
            console.dir("hei");
        }
        //document.getElementById("tulos").innerHTML = '<div id="eituloksia">Hakusi ei tuottanut tuloksia!</div>';*/
        junienTulokset(tulos);

    }
};

function poistaEdellinenLista() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

function junienTulokset(tulos) {
    poistaEdellinenLista();
    var optiot = {hour: '2-digit', minute: '2-digit', hour12: false};
    for (var i = 0; i < lkmListalle; i++) {
        var elem = document.createElement("li");
        var juna = tulos[i];

        for (var j = 0; j < juna.timeTableRows.length; j++) {
            if (juna.timeTableRows[j].stationShortCode === document.getElementById("lahtoasema").value && juna.timeTableRows[j].type === "DEPARTURE" ||
                juna.timeTableRows[j].stationShortCode === document.getElementById("paateasema").value && juna.timeTableRows[j].type === "ARRIVAL") {
                console.dir(juna.timeTableRows[j].stationShortCode);
            }
        }
    }

    //console.dir(juna);
}

/*function junienTulokset(tulos) {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    var optiot = {hour: '2-digit', minute: '2-digit', hour12: false};
    for (var i = 0; i < 2; ++i) {
        var elem = document.createElement("li");
        var juna = tulos[i];

        for (var j = 0; j < timeTableRows.length; ++j) {
            //TODO hae junan lähtö- ja pääteasema
            if (juna.timeTableRows[j].stationShortCode === lahtoasema.value && juna.timeTableRows[j].type === "DEPARTURE") {
                //console.dir(new Date(juna.timeTableRows[j].scheduledTime).toLocaleTimeString("fi", optiot));
                console.dir(juna.timeTableRows[j].stationShortCode);
            }

            if (juna.timeTableRows[j].stationShortCode === paateasema.value && juna.timeTableRows[j].type === "ARRIVAL") {
                //console.dir(new Date(juna.timeTableRows[j].scheduledTime).toLocaleTimeString("fi", optiot));
                console.dir(juna.timeTableRows[i].stationShortCode);
                console.dir("hei");
            }
            //console.dir(juna.timeTableRows[j].stationShortCode + j);
            //console.dir(lahtoasema.value);
            console.dir(paateasema.value + " hei " + juna.timeTableRows.length);
        }

        var lahtoaika = new Date(juna.timeTableRows[0].scheduledTime).toLocaleTimeString("fi", optiot);
        var saapumisaika = new Date(juna.timeTableRows[juna.timeTableRows.length - 1].scheduledTime).toLocaleTimeString("fi", optiot);
        elem.appendChild(document.createTextNode(kaannaJunanTyyppi(juna) + ": " + juna.trainType + juna.trainNumber + ", lähtee: " + lahtoaika + " saapuu: " + saapumisaika));
        lista.appendChild(elem);
    }
}*/

function kaannaJunanTyyppi(juna) {
    if (juna.trainCategory === "Long-distance") return "Kaukojuna";
    if (juna.trainCategory === "Commuter") return "Lähijuna";
}

function haedata() {
    var lahtoasema = document.getElementById("lahtoasema").value;
    var paateasema = document.getElementById("paateasema").value;
    pyynto.open('get', "https://rata.digitraffic.fi/api/v1/live-trains/station/" + lahtoasema + "/" + paateasema);
    console.log("https://rata.digitraffic.fi/api/v1/live-trains/station/" + lahtoasema + "/" + paateasema);
    pyynto.send();
}