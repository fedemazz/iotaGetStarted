//il seguente codice permette di rimanere in ascolto su un canale MAM partendo da un root
//il root è l'identificatore del MAM ed ogni volta che viene trovato un nuovo mam, la root cambia 
//viene utilizzata anche una sidekey (password del canale), in quanto il canale è restricted

const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var readline = require('readline-sync');

//root channel mam
//root = 'QFEZONJRUWORDOPEQLISNKHWBNVAOSZSXGSVECKBPZCIOPOZZLRCQO99YGHGBINULNPZFLROYLAHHCVHS'
//channel type
mode = 'restricted'
//channel key per decriptare i messaggi
//sideKey = 'MYSIDEKEY'

async function initMam() {
  console.log("In ascolto...");
  await Mam.init('https://nodes.devnet.iota.org:443');
}

//controllo ogni 5 secondi se sono presenti nuovi messaggi nel canale
async function checkMam(root, sideKey) {

  //fetch è la funzione che si occupa di recuperare i messaggi da un certo root
  const data = await Mam.fetch(root, 'restricted', sideKey, showData);
  //la nuova root, cioè l'indirizzo del prossimo messaggio, è contenuta nel ritorno di Mam.fetch
  root = data.nextRoot;
  //richiamo la funzione ogni 5 secondi
  setTimeout(checkMam, 5000);
}

//funzione per visualizzare i dati a schermo
//richiamata come callback quando viene trovato un nuovo messaggio nel canale
const showData = raw => {
    const data = trytesToAscii(raw)
    console.log(data);
    console.log('\n'+ "In ascolto...");
  }



function askToUser() {
  var root = readline.question("Inserisci il root del canale: ");
  var sideKey = readline.question("Inserisci la password del canale: ");
  checkMam(root, sideKey);
  }
  
  //chiamo init e check
  initMam()
  askToUser();