//invio di messaggi ad un channel pubblico tangle

const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
const seed ='HYEPPA9WIOAUS9GWNFOSUTIWBSZPARXXBTAFUEKIJZJBHMDGTFXMTXBUDOXRBBECAZTNENFHPF9TTCOQ';


// Initialise MAM State
let mamState = Mam.init(provider,seed)
//mettendo anche il seed in mam.init il mio canale da a me(possessore del seed la priorità) e mi permette di continuare l'invio di messaggi anche 
//successivamente facendo ripartire l'applicazione 
console.log(mamState);
// Publish to tangle
const publish = async packet => {

    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    console.log('Messaggio pubblicato', packet, '\n');
    console.log(message.root);
    return message.root
}

cont = 0;
setInterval(function(){
cont++;
//creo un oggetto js contenente le informazioni del mio messaggio
//ovviamente è sempre uguale perchè di prova
const root = publish({
    message: 'Message from Alice',
    timestamp: (new Date()).toLocaleString(),
    iter: cont
  })
}, 5000);