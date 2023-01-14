//variables 
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 =null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timerInicial = 40;
let timer = 40;

// documentos html 
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante') 
let tiempoRegresivoId = null;

// variables audio
let winAudio = new Audio('./sound/win.wav');
let loseAudio = new Audio('./sound/lose.wav');
let clickAudio = new Audio('./sound/click.wav');
let rightAudio = new Audio('./sound/right.wav');
let wrongAudio = new Audio('./sound/wrong.wav');

//numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

// funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
       mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
       if(timer ==0){
        clearInterval(tiempoRegresivoId);
        bloquearTarjetas();
        loseAudio.play(); 
       }
    },1000);
}


function bloquearTarjetas(){
    for(let i=0; i<=15; i++){
        let taejetaBloqueada = document.getElementById(i);
        taejetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt= "">`;
        taejetaBloqueada.disabled = true;
    }
}

//funcion principal 

if (temporizador == false){
    contarTiempo();
    temporizador = true;
}
function destapar(id){
tarjetasDestapadas++;
console.log(tarjetasDestapadas);
if(tarjetasDestapadas==1){
    //mostrar 1 numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt= "">`;
    clickAudio.play();

    //desabilitar 1 boton
    tarjeta1.disabled = true;

}else if(tarjetasDestapadas ==2) {
 // mostrar 2 numero
 tarjeta2 = document.getElementById(id);
 segundoResultado = numeros[id];
 tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt= "">`;
 //desabilitar 2 boton
 tarjeta2.disabled = true;
 // incrementar movimientos 
 movimientos++;
 console.log(movimientos);
 mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
 if(primerResultado==segundoResultado){
    tarjetasDestapadas = 0;
    //aumentar aciertos  
    aciertos++;
mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
rightAudio.play();

if(aciertos== 8){
    winAudio.play();
    clearInterval(tiempoRegresivoId);
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🤟💪`;
    mostrarTiempo.innerHTML = `Fantastico sólo te demoraste ${timerInicial - timer} segundos ⏱✋`;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} ✔`; 
}
 }
 else {
    wrongAudio.play(); 
    //mostrar valores y volver a tapar 
    setTimeout(()=>{
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
    }, 800);
 }
}
} 