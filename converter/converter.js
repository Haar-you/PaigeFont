var handler = {
    get : function(target, name){
	return name in target ? target[name] : name;
    }
};

var initialC = new Proxy({
    "p": String.fromCharCode(0xe056),
    "b": String.fromCharCode(0xe057),
    "m": String.fromCharCode(0xe058),
    "c": String.fromCharCode(0xe059),
    "s": String.fromCharCode(0xe05a),
    "x": String.fromCharCode(0xe05b),
    "z": String.fromCharCode(0xe05c),
    "t": String.fromCharCode(0xe05d),
    "d": String.fromCharCode(0xe05e),
    "n": String.fromCharCode(0xe05f),
    "l": String.fromCharCode(0xe060),
    "k": String.fromCharCode(0xe061),
    "g": String.fromCharCode(0xe062),
    "h": String.fromCharCode(0xe063)
}, handler);

var lastC = new Proxy({
    "p": String.fromCharCode(0xe064),
    "m": String.fromCharCode(0xe065),
    "t": String.fromCharCode(0xe066),
    "n": String.fromCharCode(0xe067),
    "k": String.fromCharCode(0xe068)
}, handler);

var tones = new Proxy({
    "1": String.fromCharCode(0xe069),
    "2": String.fromCharCode(0xe06a),
}, handler);

var vowels = new Proxy({
    "a": String.fromCharCode(0xe040),
    "i": String.fromCharCode(0xe041),
    "u": String.fromCharCode(0xe042),
    "e": String.fromCharCode(0xe043),
    "y": String.fromCharCode(0xe044),
    "o": String.fromCharCode(0xe045),
    "ia": String.fromCharCode(0xe046),
    "ua": String.fromCharCode(0xe047),
    "ie": String.fromCharCode(0xe048),
    "ue": String.fromCharCode(0xe049),
    "ai": String.fromCharCode(0xe04a),
    "ui": String.fromCharCode(0xe04b),
    "ei": String.fromCharCode(0xe04c),
    "au": String.fromCharCode(0xe04d),
    "io": String.fromCharCode(0xe04e),
    "uo": String.fromCharCode(0xe04f),
    "iai": String.fromCharCode(0xe050),
    "uai": String.fromCharCode(0xe051),
    "iei": String.fromCharCode(0xe052),
    "uei": String.fromCharCode(0xe053),
    "iau": String.fromCharCode(0xe054),
    "uau": String.fromCharCode(0xe055)
}, handler);

var patInit = "[pbmcsxztdnlkgh]";
var patVowel = "[aiueoy]+";
var patLast = "[pmtnk]";
var patTone = "[12]";

var reg = new RegExp(`(${patInit}?)(${patVowel})(${patLast}?)(${patTone}?)`);

function convert(){

    var latin = document.getElementById("latin").value;
    var paige = document.getElementById("paige");
    var text = "";
    var lines = latin.split(/\r\n|\r|\n/);

    lines.forEach(function(value, index, arr){

	var syllables = value.split(" ");

	syllables.forEach(function(syl, i, arr2){
	    var match = syl.match(reg);
	    text += initialC[match[1]] + vowels[match[2]] + lastC[match[3]] + tones[match[4]]
	});
	
	text += "<br>";
    });

    paige.innerHTML = text;
}


function changeWritingMode(mode){
    document.getElementById("paige").style.writingMode = mode;
}
