// constantes

const container = document.querySelector('.plateau');

const scoreBoard = document.querySelector('.score');

const btnStart = document.querySelector('.btnStart');

// Les variables

let derniereCachette = false;

let gameOver = false;

let score = 0;


btnStart.addEventListener('click',startGame);

function startGame(){
    
    btnStart.style.display = 'none';
    creationPlateau();
    startZombies();
    scoreBoard.innerHTML = score;
    scoring(); 
}

function startZombies(){

    let cachette = randomUp();
    let temp = Math.floor(Math.random() *3) +1;

    let tempClass = temp > 1 ? 'up' : 'up2';

    cachette.classList.add(tempClass);

    const time = Math.round(Math.random()* (1500 - 250) +250);

    setTimeout(function(){

        cachette.classList.remove(tempClass);

        if(!gameOver) startZombies();

        },time);

}

function randomUp(){
    // on créé une variable pour aller chercher toutes les div qui ont la class = cachette

    const cachettes = document.querySelectorAll('.cachette');

    // une const qui va générer un chiffre aléatoire parmi les 9 occurences

    const idx = Math.floor(Math.random()* cachettes.length);

    if(cachettes[idx].zombieId === derniereCachette){

        // on relance la génération de l'index

        return randomUp();
    }

    // on stocke le resultat dans la variable derniereCachette

    derniereCachette = cachettes[idx].zombieId;

    //on retourne la valeur obtenue

    return cachettes[idx];
}

function creationPlateau(){

    let cachetteCrees = 9;

    container.innerHTML = ' ';

    // creation d'une boucle pour la creation des divqui representent les cachettes (pas plus de 9 )

    for(let x = 0; x< cachetteCrees; x++){

        //console.log('apparitions');
        //créer les div

        let div = document.createElement('div');

        // on ajoute une classe à chaque div nouvellement créées

        div.setAttribute('class', 'cachette');

        div.zombieId = x;

        //on créé dynamiquement une div avec une class et un évènement (tir) pour les zombies

        //zombies

        let zombie = document.createElement('div');
        zombie.setAttribute('class', 'zombie');
        zombie.onclick = tir;
        div.appendChild(zombie);


        //lola

        let lola = document.createElement('div');
        lola.setAttribute('class', 'lola');
        lola.onclick = tir2;
        div.appendChild(lola);

        //mur

        let mur = document.createElement('div');
        mur.setAttribute('class','mur');
        div.appendChild(mur);

        // on rattache nos div ( 9 ) à la div plateau

        container.appendChild(div);

    }
}

function scoring(){
    scoreBoard.innerHTML = "score : " + score;

    let message = score >=10 ? "C'est gagné !" : "Vous avez perdu, voulez-vous refaire une partie?";

    if(score >= 10 || score <0){
        gameOver = true;
        btnStart.style.display = 'block';

        confirm(message);
        document.location.href = "index.html";
    }
}

function tir(){

    score++;
    this.parentNode.classList.remove('up');
    scoring();
}

function tir2(){

    score = score -5;

    this.parentNode.classList.remove('up2');
    scoring();
}