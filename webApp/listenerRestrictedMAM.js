//il seguente codice permette di rimanere in ascolto su un canale MAM partendo da un root e dalla sua password
//il root è l'identificatore del MAM ed ogni volta che viene trovato un nuovo mam, la root cambia 

//channel type
$(document).ready(function() {

  initMam()
  var root;
  var sideKey;
  $('#containerDataField').hide();
  $('#loading').hide();
  $('#channelValues').click(function() {
    root = ($('#rootChannel').val());
    sideKey = ($('#sideKeyChannel').val());
    checkMam();
  });


mode = 'restricted'

async function initMam() {
  await Mam.init('https://nodes.devnet.iota.org:443');
}

//controllo ogni 5 secondi se sono presenti nuovi messaggi nel canale
async function checkMam() {
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
    console.log("In ascolto...");
    console.log("root: " + root);
    console.log("side key: " + sideKey);
    console.log(data);
    $('#containerDataField').show();
    $('#containerDataField').append('<div class="panel panel-default" id="boxData"> <div class="panel-body"  id="dataField">' + data+ '</div> </div>');
    $('#loading').show();
  }
});

const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const asciiToTrytes = (input) => {
    let trytes = '';
    for (let i = 0; i < input.length; i++) {
        var dec = input[i].charCodeAt(0);
        trytes += TRYTE_ALPHABET[dec % 27];
        trytes += TRYTE_ALPHABET[(dec - dec % 27) / 27];
    }
    return trytes;
};

const trytesToAscii = (trytes) => {
    let ascii = '';
    for (let i = 0; i < trytes.length; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27);
    }
    return ascii;
};