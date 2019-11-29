//invio messaggi mam ma in questo caso privatamente
//usero una chiave, chiamata sideKey

const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')


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
    return message.root
}

cont = 0;
setInterval(function(){
cont++;
const root = publish({
    message: 'Message from Alice',
    timestamp: (new Date()).toLocaleString(),
    iter: cont
  })
}, 5000);
