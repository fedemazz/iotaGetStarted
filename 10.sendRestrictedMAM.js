//invio messaggi mam su canale restricted chiedendo da terminale il valore del messaggio da scrivere

const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var readline = require('readline-sync');

const provider = 'https://nodes.devnet.iota.org:443'
const mode = 'restricted'
var sideKey;

// Initialise MAM State
let mamState = Mam.init(provider)


// Publish to tangle
const publish = async packet => {

    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    console.log('Messaggio pubblicato', packet, '\n');
    console.log("root:  " + message.root);
    setTimeout(askToUser,1000);
    return message.root
}


function askToUser() {
var name = readline.question("Inserisci qui il testo del messaggio:");
publish({
    message: name,
    inviato: (new Date()).toLocaleString()
  })
}

function setSideKey(){
sideKey = readline.question("Inserisci la password del tuo futuro canale: ");
//il canale è impostato su restricted
mamState = Mam.changeMode(mamState, mode, sideKey)
}

setSideKey();
askToUser();