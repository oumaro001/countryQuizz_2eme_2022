/***LES BUTTONS */
let btnEurope = document
  .getElementById("europe")
  .addEventListener("click", () => dataContinent("europe"));
let btnAfrique = document
  .getElementById("afrique")
  .addEventListener("click", () => dataContinent("africa"));
let btnAmerique = document
  .getElementById("amerique")
  .addEventListener("click", () => dataContinent("america"));
let btnAsie = document
  .getElementById("asie")
  .addEventListener("click", () => dataContinent("asia"));
let btnOceanie = document
  .getElementById("oceanie")
  .addEventListener("click", () => dataContinent("oceania"));
let btnWorld = document
  .getElementById("world")
  .addEventListener("click", () => dataContinent("all"));
  
let section = document.getElementById("section");

  let drapeau = document.querySelector('.drapeau');
  let question_Reponces = document.querySelector('.question_Reponces');
  let block_Question;
  let pointsBlock = document.querySelector('.pointsBlock');
  let winnerPoints = 0;
  let looserPoints = 0;
  let maxPoints = 11;
  let chance = 0
  
  /* FONCTION POUR GERER LE RANDOM*****************/
  
  function randomRep(continent,tabNumeroRandom) {
    
 

    let rep1 = Math.floor(Math.random() *  continent.length);
    
    let rep2 = Math.floor(Math.random() * continent.length);
    
    if (rep2 == rep1) {
      rep2 = Math.floor(Math.random() * (0, continent.length));
  }
  let rep3 = Math.floor(Math.random() * continent.length);
  
  if (rep3 == rep2 && rep3 == rep1) {
    rep3 = Math.floor(Math.random() * (0, continent.length));
  }

  tabNumeroRandom.push(rep1,rep2,rep3);
  
  
  


  return (tabNumeroRandom)
   
}


/*********fonction pour recuperer les pays */

function recupCountry (tabNum,tabPays,TabCountry) {

  for(let i = 0; i< tabNum.length;i++){

    if(tabPays.indexOf(tabNum[i])){
      TabCountry.push(tabPays[tabNum[i]]);
    }
  
  }
}


/*************Function qui affiche les questions ***********/

function showQuestion(TabCountry,bonneReponse){

  block_Question = document.querySelector('.block_Question').style.display = 'block';
  let nbr = 1;
  drapeau.innerHTML='';
  drapeau.innerHTML = `<img src = ${bonneReponse[0].flags.png}>`;
  question_Reponces.innerHTML = '';
    for(let i = 0; i< TabCountry.length;i++){
      let li = document.createElement('p')
      li.classList.add('reponces'+nbr)
        question_Reponces.appendChild(li)
        li.textContent = `${TabCountry[i].name.common}`
        nbr++
    }
    
  
 
}

/*****Function qui compte les points et qui les affiche */

function showPoints(winnerPoints,looserPoints){

  pointsBlock.innerHTML=`<div class="points">
                          <img src="./assets/win2.gif">
                          <p>Bonne réponses : ${winnerPoints}</p>
                          </div>   
                          <div class="points">
                          <img src="./assets/looser2.gif">
                          <p>Mauvaise réponses : ${looserPoints}</p>
                          </div> `
}

/*****function qui annonce la fin du jeu */
 
function endGame(maxPoints,chance,winnerPoints,looserPoints){

  if(chance == maxPoints){

      let finalPoints = winnerPoints > looserPoints ? winnerPoints : looserPoints;
     
      if(finalPoints == winnerPoints){
        section.innerHTML=' '
        section.innerHTML=`<div class="imgEndGame"><img src="./assets/win3.gif" alt="winner images" style="witdh:20rem"> <p>T\'as gagné 😀​</p> <button class="btn btn-success ml-2" onclick='gameGO()'>Recommencer</button></div>`
        section.style.justifyContent="center";

      }
      else{
        section.innerHTML=' '
        section.innerHTML=`<div class="imgEndGame"><img src="./assets/looser.gif" alt="looser images" style="witdh:20rem"> <p>T\'as perdu ​😭​</p><button class="btn btn-success ml-2" onclick='gameGO()'>Recommencer</button></div>`;
        section.style.justifyContent="center";

      }


  }

}


/*****function qui recommance le jeu */

function gameGO(){
  
    w=location.reload();

}



/************function qui verifie le resultats **************/

function VerifResult(rep,bonneReponse,continent){
 
    

  if(rep.innerText == bonneReponse[0].name.common){
    winnerPoints++;
    showPoints(winnerPoints,looserPoints);
     
      dataContinent(continent)

    
  }else {looserPoints++;

  showPoints(winnerPoints,looserPoints);
 
  dataContinent(continent)
}

chance++;
endGame(maxPoints,chance,winnerPoints,looserPoints);
}

/**********APPEL D'API****************** */

function dataContinent(continent) {
  
  let tabNumeroRandom= [];
  let bonneReponse = [];
  let TabCountry = [];
 
  

  let req = new XMLHttpRequest();

  if (continent == "all") {
    req.open("GET", `https://restcountries.com/v3.1/${continent}`);
  } else {
    req.open("GET", `https://restcountries.com/v3.1/region/${continent}`);
  }
  req.responseType = `json`;
  req.send();

  req.onload = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      if (req.status == 200) {
        let resultContinent = req.response;

      
        randomRep(resultContinent,tabNumeroRandom,bonneReponse)
        recupCountry(tabNumeroRandom,resultContinent,TabCountry)

        bonneReponse.push(TabCountry[Math.floor(Math.random() * (0, TabCountry.length))]) ;

        showQuestion(TabCountry,bonneReponse);

        let rep1 = document.querySelector('.reponces1');
        let rep2 = document.querySelector('.reponces2');
        let rep3 = document.querySelector('.reponces3');
      
        rep1.addEventListener('click',()=>{
      
          
          VerifResult(rep1,bonneReponse,continent)
        })
        rep2.addEventListener('click',()=>{
      
          
          VerifResult(rep2,bonneReponse,continent)
        })
        
        rep3.addEventListener('click',()=>{
      
          
          VerifResult(rep3,bonneReponse,continent)
        })
      
        
      }
    }
  };
}

