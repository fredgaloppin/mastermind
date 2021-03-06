
let attempt=0;  // count---- try
let divHistorique = document.getElementById("historique");
let arrayGuesses = [];
let colors = [];
let tempColor = 0;
let precious = [];
let elementToChange = document.getElementsByTagName("body")[0];
 
// fonction random + tirage des 4 boules parmis les 6 couleurs
function random() {
    while (divHistorique.hasChildNodes()) {
        divHistorique.removeChild(divHistorique.firstChild);
    }
    attempt=0;
    precious = [];
    for (let index = 0; index < 4; index++) {
        precious.push(Math.floor(Math.random()*6));
    }
    console.log(precious);
}
// creation des events listener
document.getElementById("resetGuesses").addEventListener("click", resetcolor);
function resetcolor (){
    for (let i=0; i< colorEstimation.length;i++){
        colorEstimation[i].className = "rond blanc";
    }
}
document.getElementById("resetAll").addEventListener("click", start);
function start (){
    resetcolor();
    random();
}
// couleur
let divColor = document.getElementById("colorDisplay");
const color = divColor.getElementsByClassName("rond");
let selectColor = "";
for (let i=0; i< color.length;i++){
    color[i].addEventListener("click", function(){ 
        selectColor = (color[i].className);
        tempColor = i;
        opacity(i);
        console.log(selectColor);
        let last = selectColor.split(/[\s,]+/).pop();
        elementToChange.style.cursor = "url('assets/"+last+".png'), auto";
    }); 
}
function opacity(selected) {
    for (let index = 0; index < color.length; index++) {
        color[index].style.opacity = 0.6;    
    }
    color[selected].style.opacity = 1;
}
// estimation
let divEstimation = document.getElementById("estimation");
let colorEstimation = divEstimation.getElementsByClassName("rond");
for (let i=0; i< colorEstimation.length;i++){
    colorEstimation[i].addEventListener("click", function(){
        if (selectColor == "") {     
        } else {
            colorEstimation[i].className = selectColor;
            colors[i] = tempColor;
        } 
        });  
}
// valider

document.getElementById("valider").addEventListener("click", check);
function check(){ 
    let dotBlack = 0;
    let dotWhite = 0;  
    let valid = true;
    let copyPrecious = [...precious];
    let copyGuesses = [...colors];
    for (let index = 0; index < colorEstimation.length; index++) { 
        if (colorEstimation[index].className == "rond blanc") {
            valid = false;
            break
        }   
    }
        if (valid != true){
            alert("unvalide! try again");
        } else {
            if (attempt<=11) {
                let divClassHisto = document.createElement("div");
                divClassHisto.setAttribute("class", "histo ");
                let divClassRonds = document.createElement("div");
                divClassRonds.setAttribute("class", "ronds");
                divHistorique.appendChild(divClassHisto);
                divClassHisto.appendChild(divClassRonds);
                attempt++;
                for (let i=0; i< copyPrecious.length;i++){
                    let colorCurrent = colorEstimation[i].className;
                    let divClassRond = document.createElement("div");
                    divClassRond.setAttribute('class', colorCurrent);
                    divClassRonds.appendChild(divClassRond);
                    if (colors[i] == copyPrecious[i]) {
                        dotBlack ++;
                        copyPrecious[i] = -2;
                        copyGuesses[i]= -5;
                        console.log("copyPrecious: "+copyPrecious);
                        console.log("copyGuesses: "+copyGuesses);
                    }
                }
                for (let i=0; i< copyPrecious.length;i++){    
                        for (let index = 0; index < copyPrecious.length; index++) {
                            if (copyGuesses[i] == copyPrecious[index]) {
                                dotWhite ++;
                                copyPrecious[index] = -2;
                                copyGuesses[i]= -5;
                                console.log("copyPreciousW: "+copyPrecious);
                                console.log("copyGuessesW: "+copyGuesses);
                                break
                            }  
                        }
                }
                if (dotBlack == 4) {
                    alert("won")
                } else{
                    let divClassPetitRonds = document.createElement("div");
                    divClassPetitRonds.setAttribute("class", "petit-ronds");
                    divClassHisto.appendChild(divClassPetitRonds);
                    for (let index = 0; index < precious.length; index++) {
                        if (dotBlack != 0) {
                            let divClassPetitRond = document.createElement("div");
                            divClassPetitRond.setAttribute("class", "petit-rond black");
                            divClassPetitRonds.appendChild(divClassPetitRond);
                            dotBlack --;
                        } else {
                            if (dotWhite != 0) {
                                let divClassPetitRond = document.createElement("div");
                                divClassPetitRond.setAttribute("class", "petit-rond blanc");
                                divClassPetitRonds.appendChild(divClassPetitRond);
                                dotWhite --;
                            } else {
                                let divClassPetitRond = document.createElement("div");
                                divClassPetitRond.setAttribute("class", "petit-rond grey");
                                divClassPetitRonds.appendChild(divClassPetitRond);
                            }
                        }  
                    }
                }
            } else {
                alert("nice try, better luck next time")
            } 
            resetcolor();       
        } 
}

