
// 1. Funktio käynnistyy kun sivu avataan. Kysyy käyttäjän nimeä, jos keksejä ei vielä ole(ks. funktio 2).
// Asetetaan tarvittaessa username. Keksit voimassa yhden vuorokauden.
function tarkistaKeksi() {
    var kayttaja = getKeksi("username");
    if (kayttaja != null) {
        document.getElementById("tervehdysteksti").innerHTML = "Tervetuloa takaisin " + kayttaja + "!";
    } else {
        kayttaja = prompt("Käytämme sovelluksessamme evästeitä. Jatkamalla hyväksyt evästeiden käytön.\n\nTaidat olla täällä ensimmäistä kertaa. Anna nimesi:", "");
        if (kayttaja != "" && kayttaja != null) {
            asetaKeksi("username", kayttaja, 1);
            document.getElementById("tervehdysteksti").innerHTML = "Tervetuloa käyttämään sovellusta " + kayttaja + "!";
        }
    }
}

// 2. Ylin funktio käyttää tätä tietojen tarkistamiseen. Palauttaa löytyneen tuloksen tai tyhjän.
function getKeksi(nimi) {
    var tarkistus = new RegExp("(?:^" + nimi + "|;\s*" + nimi + ")=(.*?)(?:;|$)", "g"); // kaikki osumat. saa olla whitespacea jne.
    var tulos = tarkistus.exec(document.cookie);
    return (tulos === null) ? null : tulos[1];
}

// 3. Funktio luo cookiesit käyttäjälle. Tällä hetkellä vain username.
function asetaKeksi(keksinNimi, keksinArvo, voimassaolo) {
    var pvm = new Date();
    pvm.setTime(pvm.getTime() + (voimassaolo * 24 * 60 * 60 * 1000));  // Millisekunnit päiviksi
    var voimassaoloaika = "päättyy=" + pvm.toUTCString();
    var x = document.cookie = keksinNimi + "=" + keksinArvo + ";" + voimassaoloaika + ";path=/";
    // console.dir(x);
}




