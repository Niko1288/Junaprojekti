function asetaKeksi(cnimi, carvo, voimassaolo) {
    var d = new Date();
    d.setTime(d.getTime() + (voimassaolo * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cnimi + "=" + carvo + ";" + expires + ";path=/";
}

function getKeksi(cname) {
    var name = cname + "=";
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

function tarkistaKeksi() {
    var user = getKeksi("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            asetaKeksi("username", user, 365);
        }
    }
}