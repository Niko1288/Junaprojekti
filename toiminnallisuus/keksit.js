
//Funktio luo cookiesit käyttäjälle.
function asetaKeksi(keksinNimi, keksinArvo, voimassaolo) {
    var pvm = new Date();
    pvm.setTime(pvm.getTime() + (voimassaolo * 24 * 60 * 60 * 1000));
    var voimassaoloaika = "päättyy="+pvm.toUTCString();
    document.cookie = keksinNimi + "=" + keksinArvo + ";" + voimassaoloaika + ";path=/";
}

//Alin funktio käyttää tätä tietojen tarkistamiseen.
function getKeksi(nimi) {
    var regexp = new RegExp("(?:^" + nimi + "|;\s*" + nimi + ")=(.*?)(?:;|$)", "g");
    var result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
}

// Funktio käynnistyy kun sivu avataan. Kysyy käyttäjän nimeä, jos keksejä ei vielä ole.
// TODO: Muokkaa alert ja prompt etusivulle kirjautumisikkunaksi.
function tarkistaKeksi() {
    var kayttaja = getKeksi("username");
    if (kayttaja != null) {
        alert("Tervetuloa takaisin, " + kayttaja);
    } else {
        kayttaja = prompt("Taidat olla täällä ensimmäistä kertaa. Anna nimesi:", "");
        if (kayttaja != "" && kayttaja != null) {
            asetaKeksi("username", kayttaja, 30);
        }
    }
}