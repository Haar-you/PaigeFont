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
<div class="latin">${searchResult[j][0]}</div>
<div class="paige">${searchResult[j][1]}</div>
</div>
`;
    };

    display.innerHTML = result;
}


function showDetail(obj){
    var frameRight = document.getElementById("frameRight");
    var latin = obj.children[0].innerHTML;
    var paige = obj.children[1].innerHTML;
    var ZWSP = String.fromCharCode(0x200b);

    console.log(paige);
   

    var canvasLP = document.getElementById("displayLargePaige");
    var ctxLP = canvasLP.getContext("2d");

    ctxLP.clearRect(0, 0, canvasLP.width, canvasLP.height);
    //ctxLP.rect(0,0,200,200);
    //ctxLP.stroke();

    ctxLP.font = "200px Paige";
    ctxLP.fillText(paige, 0, 200);

    
    document.getElementById("info").innerHTML = `
パイグ文字表記: <span style="font-family:Paige; font-size: x-large;">${paige}</span><br>
パイグ文字分解表記: <span style="font-family:Paige; font-size: x-large;">${insertBetweenEachCharacter(decomposePaigeDiTriphthong(paige), ZWSP)}</span><br>
ラテン文字転写: ${latin}`;
    
}

function insertBetweenEachCharacter(str, t){
    return str.replace(/(.)(?=.)/g, `$1${t}`);
}


var ditriToMono = {
    0xe046: [fromLatinVw["i"], fromLatinVw["a"]],
    0xe047: [fromLatinVw["u"], fromLatinVw["i"]],
    0xe048: [fromLatinVw["i"], fromLatinVw["e"]],
    0xe049: [fromLatinVw["u"], fromLatinVw["e"]],
    0xe04a: [fromLatinVw["a"], fromLatinVw["i"]],
    0xe04b: [fromLatinVw["u"], fromLatinVw["i"]],
    0xe04c: [fromLatinVw["e"], fromLatinVw["i"]],
    0xe04d: [fromLatinVw["a"], fromLatinVw["u"]],
    0xe04e: [fromLatinVw["i"], fromLatinVw["o"]],
    0xe04f: [fromLatinVw["u"], fromLatinVw["o"]],
    0xe050: [fromLatinVw["i"], fromLatinVw["a"], fromLatinVw["i"]],
    0xe051: [fromLatinVw["u"], fromLatinVw["a"], fromLatinVw["i"]],
    0xe052: [fromLatinVw["i"], fromLatinVw["e"], fromLatinVw["i"]],
    0xe053: [fromLatinVw["u"], fromLatinVw["e"], fromLatinVw["i"]],
    0xe054: [fromLatinVw["i"], fromLatinVw["a"], fromLatinVw["u"]],
    0xe055: [fromLatinVw["u"], fromLatinVw["a"], fromLatinVw["u"]]
};



function decomposePaigeDiTriphthong(str){
    return str.replace(/[\ue046-\ue055]/g, function(){
	return ditriToMono[arguments[0].charCodeAt()].join("");
    });
}
