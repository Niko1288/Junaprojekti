
//Funktio luo cookiesit käyttäjälle.
function asetaKeksi(keksinNimi, keksinArvo, voimassaolo) {
    var pvm = new Date();
    pvm.setTime(pvm.getTime() + (voimassaolo * 24 * 60 * 60 * 1000));
    var voimassaoloaika = "päättyy="+pvm.toUTCString();
    document.cookie = keksinNimi + "=" + keksinArvo + ";" + voimassaoloaika + ";path=/";
}

//Alin funktio käyttää tätä tietojen tarkistamiseen.
function getKeksi(keksinNimi) {
    var name = keksinNimi + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Funktio käynnistyy kun sivu avataan. Kysyy käyttäjän nimeä, jos keksejä ei vielä ole.
function tarkistaKeksi() {
    var kayttaja = getKeksi("username");
    if (kayttaja != "") {
        alert("Tervetuloa takaisin, " + kayttaja);
    } else {
        kayttaja = prompt("Taidat olla täällä ensimmäistä kertaa. Anna nimesi:", "");
        if (kayttaja != "" && kayttaja != null) {
            asetaKeksi("username", kayttaja, 365);
        }
    }
}