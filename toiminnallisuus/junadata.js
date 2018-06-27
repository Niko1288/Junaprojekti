var lista = document.getElementById("tulos");
var pyynto = new XMLHttpRequest();
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
    var lkmListalle = document.getElementById("tulostenLkm").value;
    for (var i = 0; i < lkmListalle; i++) {
        var elem = document.createElement("li");
        var juna = tulos[i];

        try {
            for (var j = 0; j < juna.timeTableRows.length; j++) {
                if (juna.timeTableRows[j].stationShortCode === document.getElementById("lahtoasema").value && juna.timeTableRows[j].type === "DEPARTURE") {
                    var lahtopaikka = juna.timeTableRows[j].stationShortCode;
                    var lahtoaikaKesto = new Date(juna.timeTableRows[j].scheduledTime);
                    var lahtoaika = new Date(juna.timeTableRows[j].scheduledTime).toLocaleTimeString("fi", optiot);
                }
                if (juna.timeTableRows[j].stationShortCode === document.getElementById("paateasema").value && juna.timeTableRows[j].type === "ARRIVAL") {
                    var paamaara = juna.timeTableRows[j].stationShortCode;
                    var saapumisaikaKesto = new Date(juna.timeTableRows[j].scheduledTime);
                    var saapumisaika = new Date(juna.timeTableRows[j].scheduledTime).toLocaleTimeString("fi", optiot);
                }

                console.dir(matkanKesto(lahtoaikaKesto, saapumisaikaKesto));
            }

            if (juna.trainCategory === document.getElementById("tyyppi").value || document.getElementById("tyyppi").value === "kaikki") {
                if (juna.trainCategory === "Commuter") {
                    elem.appendChild(document.createTextNode(kaannaJunanTyyppi(juna) + " " + juna.commuterLineID +
                        " lähtee paikasta " + lahtopaikka + " klo " + lahtoaika + "  ja saapuu paikkaan " + paamaara + " klo " + saapumisaika + ". Matkan kesto " + matkanKesto(lahtoaikaKesto, saapumisaikaKesto) + "."));
                    lista.appendChild(elem);
                } else {
                    elem.appendChild(document.createTextNode(kaannaJunanTyyppi(juna) + " " + juna.trainType + juna.trainNumber +
                        " lähtee paikasta " + lahtopaikka + " klo " + lahtoaika + "  ja saapuu paikkaan " + paamaara + " klo " + saapumisaika + ". Matkan kesto " + matkanKesto(lahtoaikaKesto, saapumisaikaKesto) + "."));
                    lista.appendChild(elem);
                }
            } else {
                lkmListalle++;
            }
        } catch (e) {
            console.dir(e);
            onkoJunia();
        }
    }

}

function onkoJunia() {
    if (document.getElementById("tulos").innerHTML === "") {
        document.getElementById("tulos").innerHTML = '<div id="eituloksia">Hakusi ei tuottanut tuloksia!</div>';
    }
}

function kaannaJunanTyyppi(juna) {
    if (juna.trainCategory === "Long-distance") return "Kaukojuna";
    if (juna.trainCategory === "Commuter") return "Lähijuna";
    if (juna.trainCategory === "Cargo") return "Tavarajuna";
}


//Ei ota huomioon kelon ympäri kääntymistä
function matkanKesto(lahtoaika, saapumisaika) {
    var kesto = parseInt((Number(saapumisaika) - Number(lahtoaika)));
    //var millisekunnit = parseInt((kesto % 1000) / 100);
    //var sekunnit = parseInt((kesto / 1000) % 60);
    var minuutit = parseInt((kesto / (1000 * 60)) % 60);
    var tunnit = parseInt((kesto / (1000 * 60 * 60)) % 24);

    tunnit = (tunnit < 10) ? "0" + tunnit : tunnit;
    minuutit = (minuutit < 10) ? "0" + minuutit : minuutit;
    //sekunnit = (sekunnit < 10) ? "0" + sekunnit : sekunnit;

    return tunnit + ":" + minuutit /*+ ":" + sekunnit + ":" + millisekunnit*/;

}

function haedata() {
    var lahtoasema = document.getElementById("lahtoasema").value;
    var paateasema = document.getElementById("paateasema").value;
    pyynto.open('get', "https://rata.digitraffic.fi/api/v1/live-trains/station/" + lahtoasema + "/" + paateasema);
    console.log("https://rata.digitraffic.fi/api/v1/live-trains/station/" + lahtoasema + "/" + paateasema);
    pyynto.send();
}