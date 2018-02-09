var initcons = "p b m c s x z t d n l k g h".split(" ").concat(null);
var vowels = "a i u e y o ia ua ie ue ai ui ei au io uo iai uai iei uei iau uau".split(" ");
var finalcons = "p m t n k".split(" ").concat(null);
var tones = "1 2".split(" ").concat(null);


var handler = {
    get : function(target, name){
	return name in target ? target[name] : null;
    }
};

var fromLatinIc = new Proxy({
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

var fromLatinFc = new Proxy({
    "p": String.fromCharCode(0xe064),
    "m": String.fromCharCode(0xe065),
    "t": String.fromCharCode(0xe066),
    "n": String.fromCharCode(0xe067),
    "k": String.fromCharCode(0xe068)
}, handler);

var fromLatinTn = new Proxy({
    "1": String.fromCharCode(0xe069),
    "2": String.fromCharCode(0xe06a)
}, handler);

var fromLatinVw = new Proxy({
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

var searchResult = [];
var currentPage = 0;
var max = 100;


function search(){
    var searchReg = new RegExp(document.getElementById("searchBox").value);
    var syllable;
    var paige;
    searchResult = [];

    initcons.forEach(function(ic, ind1, arr1){
	vowels.forEach(function(vw, ind2, arr2){
	    finalcons.forEach(function(fc, ind3, arr3){
		tones.forEach(function(tn, ind4, arr4){
		    syllable = [ic,vw,fc,tn].join("");
		    paige = [fromLatinIc[ic],
			     fromLatinVw[vw],
			     fromLatinFc[fc],
			     fromLatinTn[tn]].join("");
		    if(syllable.match(searchReg)){
			searchResult.push([syllable, paige]);
		    }
		});
	    });
	});
    });
    currentPage = 0;
    showPage();
}

function nextPage(){
    currentPage++;
    if(currentPage*max >= searchResult.length){
	currentPage--;
	return;
    }

    showPage();
}

function prevPage(){
    currentPage--;
    if(currentPage < 0){
	currentPage = 0;
	return;
    }

    showPage();
}

function showPage(){
    var display = document.getElementById("display");
    var result = "";
    var statusbar = document.getElementById("status");

    statusbar.innerHTML = `該当${searchResult.length}個`;

    
    for(var i=0; i<max; ++i){
	var j = i+max*currentPage;
	if(j >= searchResult.length)break;
	
	result += `
<div class="cell" onClick="showDetail(this)">
<div class="latin">
${searchResult[j][0]}
</div>
<div class="paige">
${searchResult[j][1]}
</div>
</div>
`;
    };

    display.innerHTML = result;
}


function showDetail(obj){
    var frameRight = document.getElementById("frameRight");
    var latin = obj.children[0].innerHTML;
    var paige = obj.children[1].innerHTML;
   

    document.getElementById("displayLargePaige").innerHTML = paige;
    document.getElementById("info").innerHTML = `
ラテン文字転写: ${latin}


`;
    
}
