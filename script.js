window.addEventListener('load', inicio); //Garantiza que todos los recursos estén disponibles antes de ejecutar el código asociado.
let intentos = 6;
let palabra;
const API = 'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase&alphabetize=true';

fetch(API).then(response => response.json())
    .then(response => {
        palabra = response[0];
    })
    .catch(err => console.log(err));

console.log(palabra);
function inicio() {
    const button = document.getElementById("guess-button");
    const input = document.getElementById("guess-input");
    const ERROR = document.getElementById("error");
    
    //Se difine la funcion que tiene como fin verificar lo que usuario ingresa por teclado
    

    button.addEventListener("click", verificarInput);
    function verificarInput() {
        const palabra = leerIntento();
        const LETRAS = /^[a-zA-Z]+$/; // Expresión regular para verificar si la entrada contiene solo letras
        if (!LETRAS.test(palabra)) {
            ERROR.innerHTML = "Debe contener solo letras";
            input.style.borderColor = 'red';
        }
        else if(palabra.length < 5){
            ERROR.innerHTML = "Debe tener 5 letras";
            input.style.borderColor = 'red';
        }
        else {
            ERROR.innerHTML = "";
            intentar();
        }
    }
    function intentar() {
        const valor = input.value;
        const INTENTO = leerIntento();
        console.log(INTENTO);
        if (INTENTO === palabra) {
            console.log("GANASTE!")

        }
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';
        for (let i in palabra) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i] === palabra[i]) { //VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#C3E090';
            } else if (palabra.includes(INTENTO[i])) { //AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#E7DBAB';
            } else {      //GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#AAB2BD';
            }
            ROW.appendChild(SPAN)
        }
        GRID.appendChild(ROW)
        intentos--
        if (intentos == 0) {
            console.log("PERDISTE!")
        }
        if (INTENTO === palabra) {
            terminar("<h1>GANASTE!  :D</h1>")
            return
        }
        if (intentos == 0) {
            terminar("<h1>PERDISTE!  D:</h1>")
        }
    }



    function leerIntento() {
        let intento = document.getElementById("guess-input");
        intento = intento.value.toUpperCase();
        return intento;
    }
    function terminar(mensaje) {
        const INPUT = document.getElementById("guess-input");
        INPUT.disabled = true;
        button.disabled = true;
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = mensaje;
    }
}