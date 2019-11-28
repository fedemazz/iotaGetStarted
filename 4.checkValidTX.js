//serie di file js in cui passo per passo inizio con IOTA
//rete devnet
//nel seguente codice verifico se una transazione è stata verificata

// Require the IOTA libraries
const Iota = require('@iota/core');

// Create a new instance of the IOTA object
// Use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
provider: 'https://nodes.devnet.iota.org:443'
});

// Confirmed transaction
iota.getLatestInclusion(['UCCFGCVNSNELXHBQZAWQGPDLNGKOGRRUJTXIVURJJCGMWMG9GBDOBNKAAWHJCFDQHDFAAFIKPIZTS9999'])
.then(states => console.log('This transaction is confirmed? ' +  states));