//serie di file js in cui passo per passo inizio con IOTA

// nel seguento codice vado a creare diversi indirizzi con valori di indice e livelli di sicurezza diversi a partire dal mio seed

//creazione del seed: operazione da eseguire su powershell copiando la riga
//$b=[byte[]] (1..81);(new-object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($b);-join($b|%{[char[]] (65..90+57..57)[$_%27]})
//seed generato: "HYEWPPA9WIOAUS9GWNFOSUTIWBSZPARXXBTAFUEKIJZJBHMDGTFXMTXBUDOXRBBECAZTNENFHPF9TTCOQ"



//pacchetto API IOTA
const Iota = require('@iota/core');

// connessione al nodo su rete devNet
const iota = Iota.composeAPI({
  provider: 'https://nodes.iota.cafe:443'
});

//livello di sicurezza scelto per l'account
const securityLevel = 1;

//indice
const index = 0;

//mio seed segreto che ho generato in precedenza
const seed ='HYEWPPA9WIOAUS9GWNFOSUTIWBSZPARXXBTAFUEKIJZJBHMDGTFXMTXBUDOXRBBECAZTNENFHPF9TTCOQ';


//metodo per generare un unspent address con livello di sicurezza 2
//"total: n" può essere omesso
iota.getNewAddress(seed, { index: index, securityLevel: securityLevel,total: 1})
  .then(address => {
    console.log("Your address is: "+ address);
  })
  .catch(err => {
    console.log(err)
  });

  //differenza con quella di prima? 
  //perchè getNewAddress non da address diversi in base al livello di sicurezza invece generateAddress si?
  console.log(Iota.generateAddress(seed, index, securityLevel));

