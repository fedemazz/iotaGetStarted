//serie di file js in cui passo per passo inizio con IOTA

//nel seguente codice vado a creare la mia prima transazione e caricarla sulla rete devNet 

//transazione zero-value "hello world"

const Iota = require('@iota/core');
const Converter = require('@iota/converter');

// Connessione al nodo
const iota = Iota.composeAPI({
  provider: 'https://nodes.iota.cafe:443'
});

const depth = 3;
const minimumWeightMagnitude = 14;

// Define a seed and an address.
// These do not need to belong to anyone or have IOTA tokens.
// They must only contain a mamximum of 81 trytes
// or 90 trytes with a valid checksum
const seed =
  'HYEWPPA9WIOAUS9GWNFOSUTIWBSZPARXXBTAFUEKIJZJBHMDGTFXMTXBUDOXRBBECAZTNENFHPF9TTCOQ';

//vado a creare un indirizzo
const address = Iota.generateAddress(seed, 0, 1);
console.log("Address transaction: " + address);

// Define a message to send.
// This message must include only ASCII characters.
const message = JSON.stringify({"message": "La prima transazione"});

// Convert the message to trytes
const messageInTrytes = Converter.asciiToTrytes(message);

// Define a zero-value transaction object
// that sends the message to the address
const transfers = [
  {
    value: 0,
    address: address,
    message: messageInTrytes
  }
];

// Create a bundle from the `transfers` array
// and send the transaction to the node
iota
  .prepareTransfers(seed, transfers)
  .then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
  })
  .then(bundle => {
    console.log("hash della transazione: " + bundle[0].hash);
    console.log(bundle);
  })
  .catch(err => {
    console.error(err)
  });