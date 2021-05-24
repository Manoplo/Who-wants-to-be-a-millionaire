// Aquí va el setup de Express para poner el server en marcha.
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
let contador1, contador2, contador3, contador4;
let cronometro;

app.use(express.static("public"));

server.listen(5000, () => {
    console.log("escuchando al puerto 5000");
    console.log("http://localhost:5000");
});

// Aquí configuramos socket.io (Websockets)

const { Server } = require("socket.io"); // Importo socket.io al proyecto
const io = new Server(server); // Genero un objeto socket.io (con todas sus propiedades y funciones )de socket.io que se monta pasándole como argumento el server de express que hemos creado.

//Cronometro empieza aquí // PROBLEMA: EL CRONOMETRO EMPIEZA PARA CADA CONEXION Y SE MANDA A TODOS // PROBLEMA: NO HACE EL CLEARINTERVAL
let segundos = 30;
let players = [];
let nicks = [];

// io.on está esperando a eventos para ejecutar acciones. En este caso, espera un evento llamado 'conection' que ejecuta una función anónima y dentro de esa función puedes activar un evento especial 'disconnect' que registra la salida de un usuario.
io.on("connection", (socket) => {
    console.log("Alguien conectó");

    socket.on("disconnect", () => {
        console.log("Alguien se desconectó");
        players.pop(socket.id);
    });
    // AQUÍ VA UNA CONDICIÓN: SI RECIBO EL EVENTO DE ENVIAR NICK, METE AL JUGADOR EN EL ARRAY, RECOGE SU NOMBRE, LO EMITE PARA TODOS Y LO PINTA EN EL HTML

    players.push(socket.id); // Corregir meter jugador en el array cuando recibe el nickname

    //Escucho la llegada de un nick
    socket.on('nameSender', (nick) => {
        // Meto al jugador en el array
        nicks.push(nick); // Meto el nick en un array de nicks
        console.log(players);
        io.emit('playerCatch', nicks); // Envío el array con nicks
    });

    if (players.length === 3) {
        setTimeout(primeraPregunta, 5000);
    } else {
        io.emit("waiting", "Esperando a más jugadores...");
    }

    function primeraPregunta() {
        contador1 = contador2 = contador3 = contador4 = 0;
        io.emit('color1'); // Manda colorear el primero círculo. 
        io.emit("clear_counters", contador1, contador2, contador3, contador4);
        resetScreen();
        io.emit("pregunta1", "¿Cuál es en animal más rápido del mundo?", "Halcón", "Guepardo", "Pez Vela", "Leopardo");

        cronometro = setInterval(() => {
            io.emit("cronometro", segundos);
            segundos--;
            if (segundos < 0) {
                segundos = 0;
                clearInterval(cronometro);
                if (
                    contador1 > contador2 &&
                    contador1 > contador3 &&
                    contador1 > contador4
                ) {
                    io.emit("timeout", "¡Respuesta correcta!");
                    segundos = 30;
                    setTimeout(segundaPregunta, 5000);
                } else {
                    io.emit("timeout", "Ohhh, fallaste");
                    segundos = 30;
                    setTimeout(primeraPregunta, 5000);
                }
            }
        }, 1000);
    }

    function segundaPregunta() {
        contador1 = contador2 = contador3 = contador4 = 0;
        io.emit("clear_counters", contador1, contador2, contador3, contador4);
        io.emit('color2');
        resetScreen();
        io.emit(
            "pregunta2",
            "¿En qué año se redactó la constitución de EEUU?",
            "1810",
            "1787",
            "1940",
            "1550"
        );

        cronometro = setInterval(() => {
            io.emit("cronometro", segundos);
            segundos--;
            if (segundos < 0) {
                segundos = 0;
                clearInterval(cronometro);
                if (
                    contador2 > contador1 &&
                    contador2 > contador3 &&
                    contador2 > contador4
                ) {
                    io.emit("timeout", "¡Respuesta correcta!");
                    segundos = 30;
                    setTimeout(terceraPregunta, 5000);
                } else {
                    io.emit("timeout", "Ohhh, fallaste");
                    segundos = 30;
                    setTimeout(primeraPregunta, 5000);
                }
            }
        }, 1000);
    }

    function terceraPregunta() {
        contador1 = contador2 = contador3 = contador4 = 0;
        io.emit("clear_counters", contador1, contador2, contador3, contador4);
        io.emit('color3');
        resetScreen();
        io.emit(
            "pregunta3",
            "A es el padre de B, pero B no es el hijo de A. ¿Cómo se llama B?",
            "Juan",
            "Pedro",
            "Carla",
            "Julio"
        );

        cronometro = setInterval(() => {
            io.emit("cronometro", segundos);
            segundos--;
            if (segundos < 0) {
                segundos = 0;
                clearInterval(cronometro);
                if (
                    contador3 > contador1 &&
                    contador3 > contador2 &&
                    contador3 > contador4
                ) {
                    io.emit("timeout", "¡Respuesta correcta!");
                    segundos = 30;
                    setTimeout(cuartaPregunta, 5000);


                } else {
                    io.emit("timeout", "Ohhh, fallaste");
                    segundos = 30;
                    setTimeout(primeraPregunta, 5000);

                }
            }
        }, 1000);
    }

    function cuartaPregunta() {
        contador1 = contador2 = contador3 = contador4 = 0;
        io.emit("clear_counters", contador1, contador2, contador3, contador4);
        io.emit('color4');
        resetScreen();
        io.emit(
            "pregunta4",
            "¿Qué es una aceituna?",
            "Una fruta",
            "Una drupa",
            "Una verdura",
            "Una nuez"
        );

        cronometro = setInterval(() => {
            io.emit("cronometro", segundos);
            segundos--;
            if (segundos < 0) {
                segundos = 0;
                clearInterval(cronometro);
                if (
                    contador2 > contador1 &&
                    contador2 > contador3 &&
                    contador2 > contador4
                ) {
                    io.emit("timeout", "¡Respuesta correcta!");
                    segundos = 30;
                    setTimeout(quintaPregunta, 5000);


                } else {
                    io.emit("timeout", "Ohhh, fallaste");
                    segundos = 30;
                    setTimeout(primeraPregunta, 5000);

                }
            }
        }, 1000);
    }

    function quintaPregunta() {
        contador1 = contador2 = contador3 = contador4 = 0;
        io.emit("clear_counters", contador1, contador2, contador3, contador4);
        io.emit('color5');
        resetScreen();
        io.emit(
            "pregunta5",
            "Libro del filósofo Thomas Hobbes",
            "Mil Mesetas",
            "Fausto",
            "Cien años de Soledad",
            "Leviatán"
        );

        cronometro = setInterval(() => {
            io.emit("cronometro", segundos);
            segundos--;
            if (segundos < 0) {
                segundos = 0;
                clearInterval(cronometro);
                if (
                    contador4 > contador1 &&
                    contador4 > contador2 &&
                    contador4 > contador3
                ) {
                    io.emit("timeout", "¡Respuesta correcta!");
                    segundos = 30;
                    setTimeout(primeraPregunta, 5000);


                } else {
                    io.emit("timeout", "Ohhh, fallasteis...");
                    segundos = 30;
                    setTimeout(primeraPregunta, 5000);

                }
            }
        }, 1000);
    }

    function resetScreen() {
        io.emit("enable buttons");
        io.emit("clear response");
    }

    socket.on("clickBoton1", () => {
        contador1++;
        io.emit("clickBoton1", contador1);
    });
    socket.on("clickBoton2", () => {
        contador2++;
        io.emit("clickBoton2", contador2);
    });

    socket.on("clickBoton3", () => {
        contador3++;
        io.emit("clickBoton3", contador3);
    });

    socket.on("clickBoton4", () => {
        contador4++;
        io.emit("clickBoton4", contador4);
    });
}); // FIN IO