//invio messaggi mam su canale restricted chiedendo da terminale il valore del messaggio da scrivere


const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var readline = require('readline-sync');

const provider = 'https://nodes.devnet.iota.org:443'
const mode = 'restricted'
const sideKey = 'MYSIDEKEY'

// Initialise MAM State
let mamState = Mam.init(provider)

//E' l'unica modifica da fare tra questo codice e l'uppload pubblico. 
//cambio lo stato del canale mam da pubblico a privato
mamState = Mam.changeMode(mamState, mode, sideKey)
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
    timestamp: (new Date()).toLocaleString()
  })
}

askToUser();