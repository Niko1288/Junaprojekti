var lista = document.getElementById("tulos");
var pyynto = new XMLHttpRequest();
pyynto.onreadystatechange = function () {
    if (pyynto.readyState === 4 && pyynto.status === 200) {
        var tulos = JSON.parse(pyynto.responseText);
        //console.dir(tulos);
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

    var divi = document.createElement("div");
    var tulosOtsikko = document.createElement("h2");
    tulosOtsikko.appendChild(document.createTextNode("Junat välillä " + document.getElementById("lahtoasema").value + " - " + document.getElementById("paateasema").value));
    divi.appendChild(tulosOtsikko);
    var pvm = document.createElement("p");
    var pvmOptio = {weekday: 'long', year: 'numeric', month:'long', day:'numeric'};
    var pvmNyt = new Date().toLocaleDateString("fi", pvmOptio);
    pvm.appendChild(document.createTextNode(pvmNyt));
    divi.appendChild(pvm);
    lista.appendChild(divi);

    var table = document.createElement("table");
    var tBody = document.createElement("tbody");
    var tHead = document.createElement("thead");
    var otsikkoRivi = document.createElement("tr");
    var otsikko1 = document.createElement("th");
    otsikko1.appendChild(document.createTextNode("Juna"));
    var otsikko2 = document.createElement("th");
    otsikko2.appendChild(document.createTextNode("Lähtöaika"));
    var otsikko3 = document.createElement("th");
    otsikko3.appendChild(document.createTextNode("Saapumisaika"));
    var otsikko4 = document.createElement("th");
    otsikko4.appendChild(document.createTextNode("Matkan kesto"));
    otsikkoRivi.appendChild(otsikko1);
    otsikkoRivi.appendChild(otsikko2);
    otsikkoRivi.appendChild(otsikko3);
    otsikkoRivi.appendChild(otsikko4);
    tHead.appendChild(otsikkoRivi);
    table.appendChild(tHead);
    table.appendChild(tBody);

    for (var i = 0; i < lkmListalle; i++) {
        var juna = tulos[i];

        // try {
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
                    break;
                }

                //console.dir(matkanKesto(lahtoaikaKesto, saapumisaikaKesto));
            }

            if (juna.trainCategory === document.getElementById("tyyppi").value || document.getElementById("tyyppi").value === "kaikki") {
                if (juna.trainCategory === "Commuter") {
                    var tulosRivi = document.createElement("tr");
                    var tieto1 = document.createElement("td");
                    tieto1.appendChild(document.createTextNode(kaannaJunanTyyppi(juna) + " " + juna.commuterLineID));
                    var tieto2 = document.createElement("td");
                    tieto2.appendChild(document.createTextNode(lahtoaika));
                    var tieto3 = document.createElement("td");
                    tieto3.appendChild(document.createTextNode(saapumisaika));
                    var tieto4 = document.createElement("td");
                    tieto4.appendChild(document.createTextNode(matkanKesto(lahtoaikaKesto, saapumisaikaKesto)));
                    tulosRivi.appendChild(tieto1);
                    tulosRivi.appendChild(tieto2);
                    tulosRivi.appendChild(tieto3);
                    tulosRivi.appendChild(tieto4);
                    tBody.appendChild(tulosRivi);
                    lista.appendChild(table);
                    // elem.appendChild(document.createTextNode(kaannaJunanTyyppi(juna) + " " + juna.commuterLineID +
                    //     " lähtee paikasta " + lahtopaikka + " klo " + lahtoaika + "  ja saapuu paikkaan " + paamaara + " klo " + saapumisaika + ". Matkan kesto " + matkanKesto(lahtoaikaKesto, saapumisaikaKesto) + "."));
                    // lista.appendChild(elem);
                } else {
                    var tulosRivi2 = document.createElement("tr");
                    var tieto5 = document.createElement("td");
                    tieto5.appendChild(document.createTextNode(kaannaJunanTyyppi(juna) + " " + juna.trainType + juna.trainNumber));
                    var tieto6 = document.createElement("td");
                    tieto6.appendChild(document.createTextNode(lahtoaika));
                    var tieto7 = document.createElement("td");
                    tieto7.appendChild(document.createTextNode(saapumisaika));
                    var tieto8 = document.createElement("td");
                    tieto8.appendChild(document.createTextNode(matkanKesto(lahtoaikaKesto, saapumisaikaKesto)));
                    tulosRivi2.appendChild(tieto5);
                    tulosRivi2.appendChild(tieto6);
                    tulosRivi2.appendChild(tieto7);
                    tulosRivi2.appendChild(tieto8);
                    tBody.appendChild(tulosRivi2);
                    lista.appendChild(table);
                //     elem.appendChild(document.createTextNode(kaannaJunanTyyppi(juna) + " " + juna.trainType + juna.trainNumber +
                //         " lähtee paikasta " + lahtopaikka + " klo " + lahtoaika + "  ja saapuu paikkaan " + paamaara + " klo " + saapumisaika + ". Matkan kesto " + matkanKesto(lahtoaikaKesto, saapumisaikaKesto) + "."));
                //     lista.appendChild(elem);
                }
            } else {
                lkmListalle++;
            }
        // } catch (e) {
        //     console.dir(e);
        //     eiJunia();
        // }
    }

}

function eiJunia() {
    document.getElementById("tulos").innerHTML = '<div id="eituloksia">Hakusi ei tuottanut tuloksia!</div>';
}

function kaannaJunanTyyppi(juna) {
    if (juna.trainCategory === "Long-distance") return "Kaukojuna";
    if (juna.trainCategory === "Commuter") return "Lähijuna";
    if (juna.trainCategory === "Cargo") return "Tavarajuna";
    if (juna.trainCategory === "Locomotive") return "Lokomotiivi";
    // return "Mysteerijuna";
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
